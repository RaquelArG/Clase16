export class FavoritesRepository {
  /** @returns {string[]} */
  cargar() {
    throw new Error("FavoritesRepository.cargar no implementado");
  }
  /** @param {string[]} _lista */
  guardar(_lista) {
    throw new Error("FavoritesRepository.guardar no implementado");
  }
  /** @param {string} _texto @returns {string[]} lista actualizada */
  agregar(_texto) {
    throw new Error("FavoritesRepository.agregar no implementado");
  }
}
