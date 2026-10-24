import { Component } from '@angular/core';
import { FavoritosService } from '../services/favoritos';
import { Router } from '@angular/router'; 

@Component({
  imports: [],
  selector: 'app-alojamientos',
  styleUrl: './alojamientos.css',
  templateUrl: './alojamientos.html',
})
export class Alojamientos {
  constructor(
    public favoritosService: FavoritosService,
    private router: Router
  ) { }

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }

  irAFavoritos(): void {
    this.router.navigate(['/favoritos']);
  }
}
