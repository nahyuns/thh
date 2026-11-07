import { Directive, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Alojamiento } from '../../modelos/alojamiento.model';
import { AlojamientoService } from '../services/alojamiento.service';
import { FavoritoService } from '../services/favorito.service';
import { AuthService } from '../services/auth.service';

// Lógica compartida por las páginas Montaña, Ciudad, Playa y Bosque.
// Cada página solo dice cuál es su categoría (ver bosque.ts, ciudad.ts, etc.).
@Directive()
export abstract class CategoriaBase implements OnInit {
  // Cada página define la suya: 'Montaña', 'Ciudad', 'Playa' o 'Bosque'
  abstract readonly categoria: string;

  // Cambian cuando responde la API, por eso son señales
  alojamientos = signal<Alojamiento[]>([]);
  favoritosIds = signal<number[]>([]);
  cargando = signal(true);
  error = signal('');

  private alojamientoService = inject(AlojamientoService);
  private favoritoService = inject(FavoritoService);
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    // GET /alojamientos?categoria=...
    this.alojamientoService.listar({ categoria: this.categoria }).subscribe({
      next: lista => {
        this.alojamientos.set(lista as unknown as Alojamiento[]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar los alojamientos. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });

    // Si hay sesión, se cargan los favoritos para pintar los corazones
    if (this.auth.estaLogueado()) {
      this.favoritoService.listar().subscribe({
        next: lista => this.favoritosIds.set(lista.map(a => a.id)),
        error: () => {}
      });
    }
  }

  imagenUrl(a: Alojamiento): string {
    return this.alojamientoService.urlImagen(a.imagen);
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds().includes(id);
  }

  // Corazón: agrega o quita el favorito. Hace falta tener sesión iniciada.
  alternarFavorito(id: number): void {
    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/inicio-sesion']);
      return;
    }

    if (this.esFavorito(id)) {
      this.favoritoService.eliminar(id).subscribe({
        next: () => this.favoritosIds.update(lista => lista.filter(x => x !== id)),
        error: () => {}
      });
    } else {
      this.favoritoService.agregar(id).subscribe({
        next: () => this.favoritosIds.update(lista => [...lista, id]),
        error: () => {}
      });
    }
  }
}