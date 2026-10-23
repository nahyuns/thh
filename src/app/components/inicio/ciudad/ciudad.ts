import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ciudad',
  styleUrl: './ciudad.css',
  templateUrl: './ciudad.html',
})
export class Ciudad {
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
