export class DomView {
  #els;

  constructor(doc = document) {
    this.#els = {
      badge: doc.getElementById("badgeToken"),
      lista: doc.getElementById("listaFavoritos"),
      conversacion: doc.getElementById("conversacion"),
      prompt: doc.getElementById("prompt"),
      btnEnviar: doc.getElementById("btnEnviar"),
      btnGuardarFav: doc.getElementById("btnGuardarFav"),
      btnLogin: doc.getElementById("btnLogin"),
      btnCerrarModal: doc.getElementById("btnCerrarModal"),
    };
  }

  get elementos() {
    return this.#els;
  }

  leerPrompt() {
    return this.#els.prompt.value.trim();
  }
  limpiarPrompt() {
    this.#els.prompt.value = "";
  }
  setPrompt(texto) {
    this.#els.prompt.value = texto;
  }

  pintarMensaje({ rol, contenido }) {
    const div = document.createElement("div");
    div.className = "msg " + rol;
    div.textContent = contenido;
    this.#els.conversacion.appendChild(div);
    this.#els.conversacion.scrollTop = this.#els.conversacion.scrollHeight;
  }

  pintarConversacion(mensajes) {
    this.limpiarConversacion();
    mensajes.forEach((m) => this.pintarMensaje(m));
  }

  limpiarConversacion() {
    this.#els.conversacion.innerHTML = "";
  }

  /** @param {string[]} favoritos @param {(texto: string) => void} onUsar */
  pintarFavoritos(favoritos, onUsar) {
    this.#els.lista.innerHTML = "";
    favoritos.forEach((texto) => {
      const div = document.createElement("div");
      div.className = "fav";
      div.textContent = texto;

      const btn = document.createElement("button");
      btn.textContent = "Usar ▸";
      btn.addEventListener("click", () => onUsar(texto));

      div.appendChild(document.createElement("br"));
      div.appendChild(btn);
      this.#els.lista.appendChild(div);
    });
  }

  /** @param {number} restanteMs */
  actualizarBadge(restanteMs) {
    if (!restanteMs || restanteMs <= 0) {
      this.#els.badge.textContent = "🍪 Sin sesión";
      return;
    }
    const totalSeg = Math.ceil(restanteMs / 1000);
    const mm = String(Math.floor(totalSeg / 60)).padStart(2, "0");
    const ss = String(totalSeg % 60).padStart(2, "0");
    this.#els.badge.textContent = `⏱ Token expira en ${mm}:${ss}`;
  }
}
