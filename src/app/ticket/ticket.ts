import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TicketService } from '../../app/components/services/ticket.service';
import { calcularNoches } from '../../app/components/services/utilidades';

export interface Ticket {
  pdf_path?: string;
  codigo: string;
  fecha_emision: string;
  titulo: string;
  ubicacion: string;
  nombre: string;
  apellido: string;
  fecha_entrada: string;
  fecha_salida: string;
  cantidad_personas: number;
  monto: number;
}

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink],
  templateUrl: './ticket.html',
    styleUrl: './ticket.css'
})
export class TicketReserva implements OnInit {
  ticket = signal<Ticket | null>(null);
  cargando = signal(true);
  generando = signal(false);
  error = signal('');

  private idCompra = 0;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) {}

  ngOnInit(): void {
    // Lee el ":id" de la dirección /ticket/5
    this.idCompra = Number(this.route.snapshot.paramMap.get('id'));
    this.cargar();
  }

  // GET /tickets/{id_compra}
  cargar(): void {
    this.ticketService.ver(this.idCompra).subscribe({
      next: t => {
        this.ticket.set(t);
        this.cargando.set(false);
      },
      error: e => {
        this.error.set(e.error?.error ?? 'No pudimos cargar el ticket.');
        this.cargando.set(false);
      }
    });
  }

  // POST /tickets/generar/{id_compra}: crea el PDF si todavía no existe
  generarPdf(): void {
    this.error.set('');
    this.generando.set(true);

    this.ticketService.generar(this.idCompra).subscribe({
      next: () => {
        this.generando.set(false);
        this.cargar(); // vuelve a pedir el ticket para tener la ruta del PDF
      },
      error: e => {
        this.generando.set(false);
        this.error.set(e.error?.error ?? 'No se pudo generar el PDF.');
      }
    });
  }

  // Dirección del PDF ya generado
  urlPdf(): string {
    const ruta = this.ticket()?.pdf_path;
    return ruta ? this.ticketService.urlArchivo(ruta) : '';
  }

  noches(t: Ticket): number {
    return calcularNoches(t.fecha_entrada, t.fecha_salida);
  }

  imprimir(): void {
    window.print();
  }
}
