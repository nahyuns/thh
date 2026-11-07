import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlojamientoFavorito } from '../../modelos/alojamiento.model';
import { FavoritoService } from '../../components/services/favorito.service'
import { AlojamientoService } from '../../components/services/alojamiento.service';
import { AuthService } from '../../components/services/auth.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  // Cambian cuando responde la API, por eso son señales
  alojamientosFavoritos = signal<AlojamientoFavorito[]>([]);
  cargando = signal(true);
  error = signal('');

  // "public" para poder usar auth.estaLogueado() desde el HTML
  constructor(
    public auth: AuthService,
    private favoritoService: FavoritoService,
    private alojamientoService: AlojamientoService
  ) {}

  ngOnInit(): void {
    // Los favoritos son de cada usuario: sin sesión no hay nada que pedir
    if (!this.auth.estaLogueado()) {
      this.cargando.set(false);
      return;
    }
    this.cargar();
  }

  // GET /favoritos
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');

    this.favoritoService.listar().subscribe({
      next: lista => {
        this.alojamientosFavoritos.set(lista as unknown as AlojamientoFavorito[]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar tus favoritos. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // DELETE /favoritos/eliminar/{id}: al responder, lo saca de la pantalla
  quitarFavorito(id: number): void {
    this.favoritoService.eliminar(id).subscribe({
      next: () => this.alojamientosFavoritos.update(lista => lista.filter(a => a.id !== id)),
      error: () => this.error.set('No se pudo quitar el favorito. Probá de nuevo.')
    });
  }

  imagenUrl(a: AlojamientoFavorito): string {
    return this.alojamientoService.urlImagen(a.imagen);
  }
}