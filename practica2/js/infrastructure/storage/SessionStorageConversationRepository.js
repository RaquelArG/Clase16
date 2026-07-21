import { ConversationRepository } from "../../application/ports/ConversationRepository.js";
import { Conversation } from "../../domain/Conversation.js";

const KEY = "conversacion";

export class SessionStorageConversationRepository extends ConversationRepository {
  cargar() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return Conversation.desdeJSON(raw ? JSON.parse(raw) : []);
    } catch {
      // Datos corruptos en sessionStorage: se prefiere arrancar
      // en blanco antes que romper la app.
      return new Conversation();
    }
  }

  guardar(conversation) {
    sessionStorage.setItem(KEY, JSON.stringify(conversation.aContexto()));
  }

  limpiar() {
    sessionStorage.removeItem(KEY);
  }
}
