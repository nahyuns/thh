import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemCarrito } from '../../app/modelos/reserva.model';
import { CarritoService } from '../../app/components/services/carrito.service';
import { AlojamientoService } from '../../app/components/services/alojamiento.service';
import { calcularNoches } from '../../app/components/services/utilidades';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './carrito.html',
    styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  // Cambian cuando responde la API, por eso son señales
  items = signal<ItemCarrito[]>([]);
  total = signal(0);
  cargando = signal(true);
  error = signal('');
  mensaje = signal('');

  constructor(
    private carritoService: CarritoService,
    private alojamientoService: AlojamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  // GET /carrito
  cargar(): void {
    this.carritoService.ver().subscribe({
      next: respuesta => {
        this.items.set(respuesta.items);
        this.total.set(respuesta.total);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar tu reserva. Revisá que el servidor esté encendido e iniciá sesión de nuevo.');
        this.cargando.set(false);
      }
    });
  }

  // PUT /carrito/actualizar/{id}: guarda las fechas y personas que se cambiaron
  guardar(item: ItemCarrito): void {
    this.error.set('');
    this.mensaje.set('');

    this.carritoService.actualizar(item.id, {
      fecha_entrada: item.fecha_entrada,
      fecha_salida: item.fecha_salida,
      cantidad_personas: Number(item.cantidad_personas)
    }).subscribe({
      next: () => {
        this.mensaje.set('Reserva actualizada.');
        this.cargar();
      },
      error: e => {
        this.error.set(e.error?.error ?? 'No se pudo actualizar la reserva.');
        this.cargar(); // vuelve a mostrar los valores que estaban guardados
      }
    });
  }

  // DELETE /carrito/eliminar/{id}
  quitar(id: number): void {
    this.error.set('');
    this.mensaje.set('');
    this.carritoService.eliminar(id).subscribe(() => this.cargar());
  }

  // DELETE /carrito/vaciar
  vaciar(): void {
    this.error.set('');
    this.mensaje.set('');
    this.carritoService.vaciar().subscribe(() => this.cargar());
  }

  continuar(): void {
    this.router.navigate(['/compra']);
  }

  noches(item: ItemCarrito): number {
    return calcularNoches(item.fecha_entrada, item.fecha_salida);
  }

  imagenUrl(item: ItemCarrito): string {
    return this.alojamientoService.urlImagen(item.imagen);
  }
}