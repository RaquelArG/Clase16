import { Message } from "../../domain/Message.js";
import { SessionExpiredError } from "../../domain/errors/SessionExpiredError.js";

export class SendPromptUseCase {
  #conversationRepository;
  #tokenRepository;
  #llmGateway;

  constructor({ conversationRepository, tokenRepository, llmGateway }) {
    this.#conversationRepository = conversationRepository;
    this.#tokenRepository = tokenRepository;
    this.#llmGateway = llmGateway;
  }

  /**
   * @param {string} texto
   * @returns {Promise<{ respuestaIA: string }>}
   * @throws {SessionExpiredError} si la cookie no existe o venció (D.1, D.2)
   */
  async ejecutar(texto) {
    const conversation = this.#conversationRepository.cargar();
    conversation.agregar(Message.usuario(texto));
    this.#conversationRepository.guardar(conversation);

    // D.1: leer la cookie ANTES de la petición.
    // D.2: si expiró (o no existe / está mal formada), falla con 401
    //      *antes* de llegar siquiera a la latencia simulada de red.
    const token = this.#tokenRepository.leer();
    if (!token || !token.esValido()) {
      throw new SessionExpiredError();
    }

    // Recién aquí se dispara la petición. El gateway también
    // traduce un 401 propio de ApiLLM (p. ej. si el token vence
    // durante la latencia) a este mismo SessionExpiredError, así
    // que el llamador siempre maneja un único tipo de error.
    const { respuesta } = await this.#llmGateway.enviar(conversation);

    conversation.agregar(Message.ia(respuesta));
    this.#conversationRepository.guardar(conversation);

    return { respuestaIA: respuesta };
  }
}
