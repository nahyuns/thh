import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos';

@Component({
  imports: [],
  selector: 'app-ciudad',
  styleUrl: './ciudad.css',
  templateUrl: './ciudad.html',
})
export class Ciudad {
  constructor(public favoritosService: FavoritosService) { }

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }
}
