import { SessionExpiredError } from "../../domain/errors/SessionExpiredError.js";

const DURACION_TOKEN_MS = 2 * 60 * 1000; // 2 minutos

export class AppController {
  #view;
  #modalNotifier;
  #sendPromptUseCase;
  #startSessionUseCase;
  #saveFavoriteUseCase;
  #getTokenStatusUseCase;
  #handleSessionExpiredUseCase;
  #conversationRepository;
  #favoritesRepository;
  #intervaloBadge = null;

  constructor({ view, modalNotifier, useCases, conversationRepository, favoritesRepository }) {
    this.#view = view;
    this.#modalNotifier = modalNotifier;
    this.#sendPromptUseCase = useCases.sendPrompt;
    this.#startSessionUseCase = useCases.startSession;
    this.#saveFavoriteUseCase = useCases.saveFavorite;
    this.#getTokenStatusUseCase = useCases.getTokenStatus;
    this.#handleSessionExpiredUseCase = useCases.handleSessionExpired;
    this.#conversationRepository = conversationRepository;
    this.#favoritesRepository = favoritesRepository;
  }

  iniciar() {
    const { btnEnviar, prompt, btnGuardarFav, btnLogin, btnCerrarModal } = this.#view.elementos;

    btnEnviar.addEventListener("click", () => this.#enviarPrompt());
    prompt.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.#enviarPrompt();
    });
    btnGuardarFav.addEventListener("click", () => this.#guardarFavorito());
    btnLogin.addEventListener("click", () => this.#iniciarSesion());
    btnCerrarModal.addEventListener("click", () => this.#modalNotifier.ocultar());

    this.#view.pintarConversacion(this.#conversationRepository.cargar().mensajes);
    this.#view.pintarFavoritos(this.#favoritesRepository.cargar(), (t) => this.#view.setPrompt(t));

    this.#refrescarBadge();
    if (this.#getTokenStatusUseCase.ejecutar().valido) this.#reiniciarContadorBadge();
  }

  async #enviarPrompt() {
    const texto = this.#view.leerPrompt();
    if (!texto) return;

    this.#view.pintarMensaje({ rol: "user", contenido: texto });
    this.#view.limpiarPrompt();

    try {
      const { respuestaIA } = await this.#sendPromptUseCase.ejecutar(texto);
      this.#view.pintarMensaje({ rol: "ia", contenido: respuestaIA });
    } catch (error) {
      // D.3: el error asíncrono se captura con try/catch.
      if (error instanceof SessionExpiredError) {
        // D.4 y D.5 (modal + limpiar SOLO sessionStorage) delegados
        // al caso de uso; aquí solo se refleja en la vista.
        this.#handleSessionExpiredUseCase.ejecutar();
        this.#view.limpiarConversacion();
      } else {
        console.error("Error inesperado al enviar el prompt:", error);
      }
    }
  }

  #guardarFavorito() {
    const texto = this.#view.leerPrompt();
    if (!texto) return;
    const favoritos = this.#saveFavoriteUseCase.ejecutar(texto);
    this.#view.pintarFavoritos(favoritos, (t) => this.#view.setPrompt(t));
  }

  #iniciarSesion() {
    this.#startSessionUseCase.ejecutar(DURACION_TOKEN_MS);
    this.#reiniciarContadorBadge();
  }

  #reiniciarContadorBadge() {
    if (this.#intervaloBadge) clearInterval(this.#intervaloBadge);
    this.#refrescarBadge();
    this.#intervaloBadge = setInterval(() => this.#refrescarBadge(), 1000);
  }

  #refrescarBadge() {
    const { valido, restanteMs } = this.#getTokenStatusUseCase.ejecutar();
    this.#view.actualizarBadge(restanteMs);
    if (!valido && this.#intervaloBadge) {
      clearInterval(this.#intervaloBadge);
      this.#intervaloBadge = null;
    }
  }
}
