import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-alojamientos',
  styleUrl: './alojamientos.css',
  templateUrl: './alojamientos.html',
})
export class Alojamientos {
  favoritos: string[] = [];

  Favorito(id: string): boolean {
    return this.favoritos.includes(id);
  }

  alternarFavorito(id: string): void {
    if (this.Favorito(id)) {
      this.favoritos = this.favoritos.filter(
        favorito => favorito !== id
      );
    } else {
      this.favoritos = [...this.favoritos, id];
    }
  }
}
