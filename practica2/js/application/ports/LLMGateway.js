export class LLMGateway {
  /**
   * @param {import("../../domain/Conversation.js").Conversation} _conversation
   * @returns {Promise<{ respuesta: string }>}
   * @throws {import("../../domain/errors/SessionExpiredError.js").SessionExpiredError}
   * @throws {import("../../domain/errors/InvalidContextError.js").InvalidContextError}
   */
  async enviar(_conversation) {
    throw new Error("LLMGateway.enviar no implementado");
  }
}
