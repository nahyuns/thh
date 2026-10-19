import { Component } from '@angular/core';
import { FavoritosService } from '../../services/favoritos';
@Component({
  imports: [],
  selector: 'app-bosque',
  styleUrl: './bosque.css',
  templateUrl: './bosque.html',
})
export class Bosque {
 constructor(public favoritosService: FavoritosService) { }

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }

}
