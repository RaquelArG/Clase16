export class SessionExpiredError extends Error {
  constructor(mensaje = "La sesión expiró: el Access Token venció o no existe.") {
    super(mensaje);
    this.name = "SessionExpiredError";
    this.status = 401;
  }
}
