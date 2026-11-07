import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReservaRecibida } from '../../../modelos/reserva.model';
import { CompraService } from '../../services/compra.service';

@Component({
  imports: [DatePipe],
  selector: 'app-pagos-cobros-admin',
  styleUrl: './pagos-cobros-admin.css',
  templateUrl: './pagos-cobros-admin.html',
})
export class PagosCobrosAdmin implements OnInit {

  // Cada reserva confirmada es un movimiento (mismos datos que la pantalla de reservas)
  movimientos = signal<ReservaRecibida[]>([]);
  cargando = signal(true);
  error = signal('');

  // Variable del buscador
  textoBusqueda = '';

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    // GET /compras/recibidas
    this.compraService.recibidas().subscribe({
      next: lista => {
        this.movimientos.set(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar los movimientos. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // Busca por el nombre del huésped o del alojamiento
  buscar(event: Event) {
    this.textoBusqueda = (event.target as HTMLInputElement).value.toLowerCase();
  }

  // Nombre del huésped
  huesped(m: ReservaRecibida): string {
    return `${m.nombre} ${m.apellido}`;
  }

  // Filtro para buscar
  get movimientosFiltrados(): ReservaRecibida[] {
    return this.movimientos().filter(m =>
      this.huesped(m).toLowerCase().includes(this.textoBusqueda) ||
      m.titulo.toLowerCase().includes(this.textoBusqueda)
    );
  }

  // Calcula el total recaudado (suma de todas las reservas confirmadas)
  get totalRecaudado(): number {
    return this.movimientos().reduce((total, m) => total + Number(m.total), 0);
  }

  // Calcula lo cobrado en el mes actual (según la fecha en que se emitió el ticket)
  get ingresosDelMes(): number {
    const hoy = new Date();
    const mes = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;

    return this.movimientos()
      .filter(m => (m.fecha_emision ?? m.fecha_entrada).startsWith(mes))
      .reduce((total, m) => total + Number(m.total), 0);
  }

  // Cuenta las operaciones
  get cantidadOperaciones(): number {
    return this.movimientos().length;
  }

  // Da formato a los importes
  formatearImporte(importe: number | string): string {
    return '$' + Number(importe).toLocaleString('es-AR');
  }

}