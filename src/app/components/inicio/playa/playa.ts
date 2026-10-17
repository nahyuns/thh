import { Component } from '@angular/core';


@Component({
  imports: [],
  selector: 'app-playa',
  styleUrl: './playa.css',
  templateUrl: './playa.html',
})
export class Playa {
  favoritos: string[] = [];
  
  Favorito(id: string): boolean {
    return this.favoritos.includes(id);
  }

  alternarFavorito(id: string): void {
    if (this.Favorito(id)) {
      this.favoritos = this.favoritos.filter(
        (favorito: string) => favorito !== id
      );
    } else {
      this.favoritos = [...this.favoritos, id];
    }
  }
}
