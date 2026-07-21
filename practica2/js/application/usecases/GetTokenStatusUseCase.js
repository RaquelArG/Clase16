export class GetTokenStatusUseCase {
  #tokenRepository;

  constructor({ tokenRepository }) {
    this.#tokenRepository = tokenRepository;
  }

  /** @returns {{ valido: boolean, restanteMs: number }} */
  ejecutar() {
    const token = this.#tokenRepository.leer();
    if (!token || !token.esValido()) {
      return { valido: false, restanteMs: 0 };
    }
    return { valido: true, restanteMs: token.tiempoRestanteMs() };
  }
}
