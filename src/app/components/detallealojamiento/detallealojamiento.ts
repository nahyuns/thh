import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlojamientoService } from '../../components/services/alojamiento.service'
import { CarritoService } from '../../components/services/carrito.service';
import { AuthService } from '../../components/services/auth.service';
import { calcularNoches } from '../../components/services/utilidades';

// Esta pantalla usa los datos con estos nombres.
// Se arma a partir de lo que devuelve la API (ver cargar()).
interface Alojamiento {
  id: number;
  nombre: string;
  categoria: string;
  ubicacion: string;
  imagen: string;
  descripcion: string;
  huespedes: number;
  precio: number;
}

@Component({
  imports: [DecimalPipe, FormsModule, RouterLink],
  selector: 'app-detallealojamiento',
  styleUrl: './detallealojamiento.css',
  templateUrl: './detallealojamiento.html',
})
export class DetalleAlojamiento {
  // Cambian cuando responde la API, por eso son señales
  aloj = signal<Alojamiento | null>(null);
  cargando = signal(true);
  enviando = signal(false);
  mensajeError = signal('');

  // La plantilla usa "alojamiento" en muchos lugares: esto lo deja disponible
  // en todo el HTML, sin importar dónde estén las llaves de @if.
  get alojamiento(): Alojamiento | null {
    return this.aloj();
  }

  entrada = '';
  salida = '';
  cantidadHuespedes = 1;

  // "public" para poder usar auth.estaLogueado() desde el HTML
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alojamientoService: AlojamientoService,
    private carritoService: CarritoService,
    public auth: AuthService
  ) {
    // Cada vez que cambia el id de la dirección (/detallealojamiento/5), se carga ese alojamiento
    this.route.paramMap.subscribe(params => this.cargar(Number(params.get('id'))));
  }

  // GET /alojamientos/{id}
  cargar(id: number): void {
    this.cargando.set(true);
    this.aloj.set(null);

    this.alojamientoService.verUno(id).subscribe({
      next: a => {
        this.aloj.set({
          id: a.id,
          nombre: a.titulo ?? '',
          categoria: a.categoria ?? '',
          ubicacion: a.ubicacion ?? '',
          imagen: typeof a.imagen === 'string'
            ? this.alojamientoService.urlImagen(String(a.imagen))
            : '',
          descripcion: a.descripcion ?? '',
          huespedes: Number(a.capacidad ?? 0),
          precio: Number(a.precio_noche)   // MySQL lo manda como texto
        });
        this.cargando.set(false);
      },
      // Si no existe (404) o falla la conexión, se muestra "No encontramos este alojamiento"
      error: () => {
        this.aloj.set(null);
        this.cargando.set(false);
      }
    });
  }

  get noches(): number {
    return calcularNoches(this.entrada, this.salida);
  }

  get total(): number {
    return this.noches * (this.aloj()?.precio ?? 0);
  }

  get fechaMinima(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  // Botón "Agregar a mi reserva": valida y guarda la reserva pendiente en la base
  // (POST /carrito/agregar). Después lleva a la página donde se revisa y se confirma.
  agregarAlCarrito(): void {
    this.mensajeError.set('');

    const alojamiento = this.aloj();

    if (!alojamiento) {
      this.mensajeError.set('No se encontró el alojamiento.');
      return;
    }

    // Hace falta una sesión iniciada para reservar
    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/inicio-sesion']);
      return;
    }

    if (!this.entrada || !this.salida) {
      this.mensajeError.set('Elegí la fecha de entrada y la de salida.');
      return;
    }

    if (this.entrada < this.fechaMinima) {
      this.mensajeError.set('La entrada no puede ser una fecha pasada.');
      return;
    }

    if (this.noches <= 0) {
      this.mensajeError.set('La salida debe ser posterior a la entrada.');
      return;
    }

    if (this.cantidadHuespedes < 1 || this.cantidadHuespedes > alojamiento.huespedes) {
      this.mensajeError.set(`Este alojamiento admite hasta ${alojamiento.huespedes} huéspedes.`);
      return;
    }

    this.enviando.set(true);

    this.carritoService.agregar({
      alojamiento_id: alojamiento.id,
      fecha_entrada: this.entrada,
      fecha_salida: this.salida,
      cantidad_personas: this.cantidadHuespedes
    }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.router.navigate(['/carrito']);
      },
      error: e => {
        this.enviando.set(false);
        // Por ejemplo: "El alojamiento no está disponible en esas fechas"
        this.mensajeError.set(e.error?.error ?? 'No se pudo agregar a tu reserva. Probá de nuevo.');
      }
    });
  }
}