export class InvalidContextError extends Error {
  constructor(formatoEsperado = '[{ rol: "user"|"ia", contenido: string }, ...]') {
    super(`El formato de la conversación es inválido. Esperado: ${formatoEsperado}`);
    this.name = "InvalidContextError";
    this.status = 422;
  }
}
