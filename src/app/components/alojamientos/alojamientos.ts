import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alojamiento } from '../../modelos/alojamiento.model';
import { AlojamientoService } from '../services/alojamiento.service';
import { FavoritoService } from '../../components/services/favorito.service'
import { AuthService } from '../../components/services/auth.service';

@Component({
  imports: [RouterLink, DecimalPipe, NgTemplateOutlet],
  selector: 'app-alojamientos',
  styleUrl: './alojamientos.css',
  templateUrl: './alojamientos.html',
})
export class Alojamientos implements OnInit {
  precio_noche(precio_noche: any): number {
    throw new Error('Method not implemented.');
  }
  descripcion: string | undefined;
  capacidad: number | undefined;
  imagen(imagen: any): string {
    throw new Error('Method not implemented.');
  }
  // Datos de la búsqueda (vienen de la dirección, por ejemplo /alojamientos?categoria=Playa)
  categoria = '';
  destino = '';
  entrada = '';
  salida = '';
  huespedes = 2;

  // Cambian cuando responde la API, por eso son señales
  alojamientos = signal<Alojamiento[]>([]);
  favoritosIds = signal<number[]>([]);
  cargando = signal(true);
  error = signal('');

  // Los grupos que se muestran en la página, en este orden
  categorias = [
    { nombre: 'Montaña', etiqueta: 'NATURALEZA Y AVENTURA', titulo: 'Alojamientos de montaña', texto: 'Entre Bariloche y El Bolsón.', ruta: '/montana' },
    { nombre: 'Ciudad', etiqueta: 'CULTURA Y GASTRONOMÍA', titulo: 'Alojamientos en la ciudad', texto: 'Entre Buenos Aires y La Plata.', ruta: '/ciudad' },
    { nombre: 'Playa', etiqueta: 'MAR Y DESCANSO', titulo: 'Alojamientos de playa', texto: 'Desde Las Grutas hasta Monte Hermoso.', ruta: '/playa' },
    { nombre: 'Bosque', etiqueta: 'NATURALEZA Y TRANQUILIDAD', titulo: 'Alojamientos en el bosque', texto: 'Entre Bariloche y El Bolsón.', ruta: '/bosque' },
  ];
  id: any;
  titulo: string | undefined;
  ubicacion: string | undefined;

  constructor(
    private alojamientoService: AlojamientoService,
    private favoritoService: FavoritoService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Cada vez que cambia la búsqueda en la dirección, se vuelve a pedir la lista
    this.route.queryParams.subscribe(params => {
      this.categoria = params['categoria'] || '';
      this.destino = params['destino'] || '';
      this.entrada = params['entrada'] || '';
      this.salida = params['salida'] || '';
      this.huespedes = Number(params['huespedes'] || 2);
      this.cargar();
    });

    // Si hay sesión, se cargan los favoritos para pintar los corazones
    if (this.auth.estaLogueado()) {
      this.favoritoService.listar().subscribe({
        next: lista => this.favoritosIds.set(lista.map(a => a.id)),
        error: () => { }
      });
    }
  }

  // Le pide a la API los alojamientos que cumplen la búsqueda
  cargar(): void {
    this.cargando.set(true);
    this.error.set('');

    this.alojamientoService.listar({
      categoria: this.categoria,
      destino: this.destino,
      capacidad: this.huespedes
    }).subscribe({
      next: lista => {
        this.alojamientos.set(lista as unknown as Alojamiento[]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar los alojamientos. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // Los alojamientos de una categoría
  delGrupo(categoria: string): Alojamiento[] {
    return this.alojamientos().filter(a => a.categoria === categoria);
  }

  // Los que no tienen una categoría conocida (para que ninguno quede oculto)
  otros(): Alojamiento[] {
    const conocidas = this.categorias.map(c => c.nombre);
    return this.alojamientos().filter(a => !conocidas.includes(a.categoria ?? ''));
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
        error: () => { }
      });
    } else {
      this.favoritoService.agregar(id).subscribe({
        next: () => this.favoritosIds.update(lista => [...lista, id]),
        error: () => { }
      });
    }
  }
}