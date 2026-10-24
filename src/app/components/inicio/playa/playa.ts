import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos';

@Component({
  imports: [],
  selector: 'app-playa',
  styleUrl: './playa.css',
  templateUrl: './playa.html',
})
export class Playa {
  constructor(public favoritosService: FavoritosService) { }

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }
}
