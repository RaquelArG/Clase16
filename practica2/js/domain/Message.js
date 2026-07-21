export class Message {
  constructor(rol, contenido) {
    if (rol !== "user" && rol !== "ia") {
      throw new TypeError(`Rol de mensaje inválido: "${rol}". Debe ser "user" o "ia".`);
    }
    if (typeof contenido !== "string" || contenido.length === 0) {
      throw new TypeError("El contenido del mensaje debe ser un string no vacío.");
    }
    this.rol = rol;
    this.contenido = contenido;
    Object.freeze(this);
  }

  static usuario(contenido) {
    return new Message("user", contenido);
  }

  static ia(contenido) {
    return new Message("ia", contenido);
  }

  /** Forma exacta que exige el contrato de ApiLLM. */
  toJSON() {
    return { rol: this.rol, contenido: this.contenido };
  }
}
