export class HandleSessionExpiredUseCase {
  #conversationRepository;
  #notifier;

  constructor({ conversationRepository, notifier }) {
    this.#conversationRepository = conversationRepository;
    this.#notifier = notifier;
  }

  ejecutar() {
    // D.5: se borra el sessionStorage de la conversación.
    this.#conversationRepository.limpiar();
    // D.4: se notifica (modal) que la sesión expiró.
    this.#notifier.notificar();
  }
}
