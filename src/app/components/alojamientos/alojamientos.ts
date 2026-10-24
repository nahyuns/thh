
import { Component } from '@angular/core';
import { FavoritosService } from '../services/favoritos';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-alojamientos',
  styleUrl: './alojamientos.css',
  templateUrl: './alojamientos.html',
})
export class Alojamientos {
  constructor(
    public favoritosService: FavoritosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.categoria = params['categoria'] || '';
      this.destino = params['destino'] || '';
      this.entrada = params['entrada'] || '';
      this.salida = params['salida'] || '';
      this.huespedes = Number(params['huespedes'] || 2);
    });
  }

  categoria = '';
  destino = '';
  entrada = '';
  salida = '';
  huespedes = 2;

  Favorito(id: string): boolean {
    return this.favoritosService.esFavorito(id);
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
  }

  irAFavoritos(): void {
    this.router.navigate(['/favoritos']);
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
