import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { ItemCarrito } from '../modelos/reserva.model';
import { CarritoService } from '../../app/components/services/carrito.service';
import { CompraService } from '../../app/components/services/compra.service';
import { TicketService } from '../../app/components/services/ticket.service';
import { calcularNoches } from '../../app/components/services/utilidades';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink],
  templateUrl: './resumencompra.html',
  styleUrl: './resumencompra.css'
})
export class ResumenCompra implements OnInit {
  items = signal<ItemCarrito[]>([]);
  total = signal(0);
  cargando = signal(true);
  procesando = signal(false);
  error = signal('');

  constructor(
    private carritoService: CarritoService,
    private compraService: CompraService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoService.ver().subscribe({
      next: respuesta => {
        this.items.set(respuesta.items);
        this.total.set(respuesta.total);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar el resumen. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // Botón "Confirmar reserva":
  // 1) confirma la compra  2) genera el PDF de cada ticket  3) va al ticket
  confirmar(): void {
    this.error.set('');
    this.procesando.set(true);

    this.compraService.finalizar().subscribe({
      next: respuesta => {
        const ids = respuesta.compras.map(c => c.id_compra);

        // Genera los PDF. Si alguno falla (por ejemplo, falta FPDF), la reserva igual
        // quedó confirmada: el PDF se puede generar después desde la página del ticket.
        forkJoin(ids.map(id => this.ticketService.generar(id).pipe(catchError(() => of(null))))).subscribe(() => {
          this.procesando.set(false);
          this.router.navigate(ids.length === 1 ? ['/ticket', ids[0]] : ['/mis-reservas']);
        });
      },
      error: e => {
        this.procesando.set(false);
        // Por ejemplo: "ya no está disponible en las fechas elegidas"
        this.error.set(e.error?.error ?? 'No se pudo confirmar la reserva. Probá de nuevo.');
      }
    });
  }

  noches(item: ItemCarrito): number {
    return calcularNoches(item.fecha_entrada, item.fecha_salida);
  }
}