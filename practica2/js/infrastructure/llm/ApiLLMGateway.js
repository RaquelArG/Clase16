import { LLMGateway } from "../../application/ports/LLMGateway.js";
import { ApiLLM } from "./ApiLLM.js";
import { SessionExpiredError } from "../../domain/errors/SessionExpiredError.js";
import { InvalidContextError } from "../../domain/errors/InvalidContextError.js";

export class ApiLLMGateway extends LLMGateway {
  async enviar(conversation) {
    try {
      const data = await ApiLLM.enviar(conversation.aContexto());
      return { respuesta: data.respuesta };
    } catch (errorCrudo) {
      if (errorCrudo && errorCrudo.status === 401) {
        throw new SessionExpiredError();
      }
      if (errorCrudo && errorCrudo.status === 422) {
        throw new InvalidContextError(errorCrudo.esperado);
      }
      throw errorCrudo; // error verdaderamente inesperado: no lo disfrazamos
    }
  }
}
