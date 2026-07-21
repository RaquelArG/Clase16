export class ConversationRepository {
  /** @returns {import("../../domain/Conversation.js").Conversation} */
  cargar() {
    throw new Error("ConversationRepository.cargar no implementado");
  }
  /** @param {import("../../domain/Conversation.js").Conversation} _conversation */
  guardar(_conversation) {
    throw new Error("ConversationRepository.guardar no implementado");
  }
  limpiar() {
    throw new Error("ConversationRepository.limpiar no implementado");
  }
}
