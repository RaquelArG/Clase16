const PREFIJO = "tk_";
const FORMATO = /^tk_(\d+)$/;

export class AccessToken {
  #expiraEnMs;

  constructor(expiraEnMs) {
    this.#expiraEnMs = expiraEnMs;
  }

  static emitir(duracionMs) {
    return new AccessToken(Date.now() + duracionMs);
  }

  /** @param {string|null} valorCookie */
  static desdeValorCookie(valorCookie) {
    if (!valorCookie) return null;
    const m = String(valorCookie).match(FORMATO);
    return m ? new AccessToken(Number(m[1])) : null;
  }

  aValorCookie() {
    return `${PREFIJO}${this.#expiraEnMs}`;
  }

  get expiraEnMs() {
    return this.#expiraEnMs;
  }

  esValido(ahoraMs = Date.now()) {
    return ahoraMs < this.#expiraEnMs;
  }

  tiempoRestanteMs(ahoraMs = Date.now()) {
    return this.#expiraEnMs - ahoraMs;
  }
}
