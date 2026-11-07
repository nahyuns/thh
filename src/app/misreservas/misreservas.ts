import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompraHistorial } from '../../app/modelos/reserva.model';
import { CompraService } from '../../app/components/services/compra.service';
import { AlojamientoService } from '../../app/components/services/alojamiento.service';


@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [DatePipe, DecimalPipe, RouterLink],
  templateUrl: './misreservas.html',
  styleUrl: './misreservas.css'
})
export class MisReservas implements OnInit {
  compras = signal<CompraHistorial[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(private compraService: CompraService, private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    // GET /compras
    this.compraService.historial().subscribe({
      next: lista => {
        this.compras.set(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar tus reservas. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  imagenUrl(c: CompraHistorial): string {
    return this.alojamientoService.urlImagen(c.imagen);
  }
}