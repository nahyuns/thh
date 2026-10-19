
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favoritos: string[] = [];

  obtenerFavoritos(): string[] {
    return this.favoritos;
  }

  esFavorito(id: string): boolean {
    return this.favoritos.includes(id);
  }

  alternarFavorito(id: string): void {
    if (this.esFavorito(id)) {
      this.favoritos = this.favoritos.filter(
        favorito => favorito !== id
      );
    } else {
      this.favoritos = [...this.favoritos, id];
    }
  }
}


