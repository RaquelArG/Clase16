import { SessionExpiredNotifier } from "../../application/ports/SessionExpiredNotifier.js";

export class SessionExpiredModalNotifier extends SessionExpiredNotifier {
  #modalEl;

  constructor(modalEl) {
    super();
    this.#modalEl = modalEl;
  }

  notificar() {
    this.#modalEl.classList.add("visible");
  }

  ocultar() {
    this.#modalEl.classList.remove("visible");
  }
}
