import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos';

@Component({
  imports: [],
  selector: 'app-montana',
  styleUrl: './montana.css',
  templateUrl: './montana.html',
})
export class Montana {
  constructor(public favoritosService: FavoritosService) { }

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }
}
