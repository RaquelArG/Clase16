export class SaveFavoriteUseCase {
  #favoritesRepository;

  constructor({ favoritesRepository }) {
    this.#favoritesRepository = favoritesRepository;
  }

  /** @param {string} texto @returns {string[]} lista de favoritos actualizada */
  ejecutar(texto) {
    const limpio = (texto ?? "").trim();
    if (!limpio) return this.#favoritesRepository.cargar();
    return this.#favoritesRepository.agregar(limpio);
  }
}
