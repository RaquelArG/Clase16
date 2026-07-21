import { Message } from "./Message.js";

export class Conversation {
  #mensajes;

  constructor(mensajes = []) {
    this.#mensajes = mensajes.map((m) =>
      m instanceof Message ? m : new Message(m.rol, m.contenido)
    );
  }

  agregar(mensaje) {
    if (!(mensaje instanceof Message)) {
      throw new TypeError("Conversation.agregar solo acepta instancias de Message.");
    }
    this.#mensajes = [...this.#mensajes, mensaje];
    return this;
  }

  get mensajes() {
    return [...this.#mensajes];
  }

  estaVacia() {
    return this.#mensajes.length === 0;
  }

  /** Formato exacto que exige ApiLLM: [{ rol, contenido }, ...] */
  aContexto() {
    return this.#mensajes.map((m) => m.toJSON());
  }

  static desdeJSON(data) {
    return new Conversation(Array.isArray(data) ? data : []);
  }
}
