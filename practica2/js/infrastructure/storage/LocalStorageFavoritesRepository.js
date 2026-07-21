import { FavoritesRepository } from "../../application/ports/FavoritesRepository.js";

const KEY = "favoritos";

export class LocalStorageFavoritesRepository extends FavoritesRepository {
  cargar() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  guardar(lista) {
    localStorage.setItem(KEY, JSON.stringify(lista));
  }

  agregar(texto) {
    const lista = [...this.cargar(), texto];
    this.guardar(lista);
    return lista;
  }
}
