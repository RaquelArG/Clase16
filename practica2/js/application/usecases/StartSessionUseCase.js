export class StartSessionUseCase {
  #tokenRepository;

  constructor({ tokenRepository }) {
    this.#tokenRepository = tokenRepository;
  }

  /** @param {number} duracionMs */
  ejecutar(duracionMs) {
    return this.#tokenRepository.emitir(duracionMs);
  }
}
