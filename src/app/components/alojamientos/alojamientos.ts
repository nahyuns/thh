
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-alojamientos',
  styleUrl: './alojamientos.css',
  templateUrl: './alojamientos.html',
})
export class Alojamientos {
  favoritos: string[] = [];

  categoria = '';
  destino = '';
  entrada = '';
  salida = '';
  huespedes = 2;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.categoria = params['categoria'] || '';
      this.destino = params['destino'] || '';
      this.entrada = params['entrada'] || '';
      this.salida = params['salida'] || '';
      this.huespedes = Number(params['huespedes'] || 2);
    });
  }

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

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  mostrarAlojamiento(
    categoriaAlojamiento: string,
    ubicacion: string,
    capacidad: number,
    nombre: string
  ): boolean {
    const coincideCategoria =
      !this.categoria ||
      this.normalizar(categoriaAlojamiento) ===
      this.normalizar(this.categoria);

    const destinoBuscado = this.normalizar(this.destino);
    const coincideDestino =
      !destinoBuscado ||
      this.normalizar(ubicacion).includes(destinoBuscado) ||
      this.normalizar(nombre).includes(destinoBuscado);

    const coincideCapacidad = capacidad >= this.huespedes;

    return coincideCategoria && coincideDestino && coincideCapacidad;
  }
}
