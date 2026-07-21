export class TokenRepository {
  /** @param {number} _duracionMs @returns {import("../../domain/AccessToken.js").AccessToken} */
  emitir(_duracionMs) {
    throw new Error("TokenRepository.emitir no implementado");
  }
  /** @returns {import("../../domain/AccessToken.js").AccessToken | null} */
  leer() {
    throw new Error("TokenRepository.leer no implementado");
  }
}
