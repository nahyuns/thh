import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservaRecibida } from '../../../modelos/reserva.model';
import { CompraService } from '../../services/compra.service';

// El estado de una reserva se calcula con las fechas:
// Próxima (todavía no empezó), En curso (el huésped está alojado) o Finalizada.
type EstadoReserva = 'Próxima' | 'En curso' | 'Finalizada';

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservas-admin.html',
  styleUrl: './reservas-admin.css'
})
export class ReservasAdmin implements OnInit {

  // LISTA DE RESERVAS (vienen de la API, por eso son señales)
  reservas = signal<ReservaRecibida[]>([]);
  cargando = signal(true);
  error = signal('');

  // BUSCADOR Y FILTROS
  busqueda: string = '';
  filtroEstado: string = 'Todos';
  fechaDesde: string = '';
  fechaHasta: string = '';

  // PAGINACIÓN
  paginaActual: number = 1;
  reservasPorPagina: number = 5;

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    // GET /compras/recibidas: las reservas confirmadas en mis alojamientos
    this.compraService.recibidas().subscribe({
      next: (lista: ReservaRecibida[]) => {
        this.reservas.set(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar las reservas. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // Nombre del huésped
  huesped(reserva: ReservaRecibida): string {
    return `${reserva.nombre} ${reserva.apellido}`;
  }

  // Estado según las fechas de hoy
  estadoDe(reserva: ReservaRecibida): EstadoReserva {
    const hoy = this.hoy();
    if (hoy < reserva.fecha_entrada) return 'Próxima';
    if (hoy >= reserva.fecha_salida) return 'Finalizada';
    return 'En curso';
  }

  // La fecha de hoy como AAAA-MM-DD (hora local)
  private hoy(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // ESTADÍSTICAS
  get totalReservas(): number {
    return this.reservas().length;
  }

  get totalProximas(): number {
    return this.reservas().filter(r => this.estadoDe(r) === 'Próxima').length;
  }

  get totalEnCurso(): number {
    return this.reservas().filter(r => this.estadoDe(r) === 'En curso').length;
  }

  get totalFinalizadas(): number {
    return this.reservas().filter(r => this.estadoDe(r) === 'Finalizada').length;
  }

  // FILTRAR RESERVAS
  get reservasFiltradas(): ReservaRecibida[] {
    return this.reservas().filter(reserva => {

      const texto = this.busqueda.toLowerCase().trim();

      const coincideBusqueda =
        this.huesped(reserva).toLowerCase().includes(texto) ||
        reserva.titulo.toLowerCase().includes(texto);

      const coincideEstado =
        this.filtroEstado === 'Todos' ||
        this.estadoDe(reserva) === this.filtroEstado;

      const coincideFechaDesde =
        !this.fechaDesde || reserva.fecha_entrada >= this.fechaDesde;

      const coincideFechaHasta =
        !this.fechaHasta || reserva.fecha_entrada <= this.fechaHasta;

      return coincideBusqueda && coincideEstado && coincideFechaDesde && coincideFechaHasta;
    });
  }

  // RESERVAS DE LA PÁGINA ACTUAL
  get reservasPaginadas(): ReservaRecibida[] {
    const inicio = (this.paginaActual - 1) * this.reservasPorPagina;
    const fin = inicio + this.reservasPorPagina;
    return this.reservasFiltradas.slice(inicio, fin);
  }

  // CANTIDAD DE PÁGINAS
  get totalPaginas(): number {
    return Math.ceil(this.reservasFiltradas.length / this.reservasPorPagina);
  }

  // NÚMEROS DE PÁGINA
  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  // ACTUALIZAR FILTROS
  actualizarFiltros(): void {
    this.paginaActual = 1;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.filtroEstado = 'Todos';
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.actualizarFiltros();
  }

  // CAMBIAR PÁGINA
  cambiarPagina(pagina: number): void {
    const nuevaPagina = this.paginaActual + pagina;

    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  // IR A UNA PÁGINA ESPECÍFICA
  irPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // FORMATEAR FECHAS
  formatearFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  // VER RESERVA
  verReserva(reserva: ReservaRecibida): void {
    alert(
      `DATOS DE LA RESERVA\n\n` +
      `Huésped: ${this.huesped(reserva)}\n` +
      `Correo: ${reserva.correo}\n` +
      `Alojamiento: ${reserva.titulo}\n` +
      `Check-in: ${this.formatearFecha(reserva.fecha_entrada)}\n` +
      `Check-out: ${this.formatearFecha(reserva.fecha_salida)}\n` +
      `Personas: ${reserva.cantidad_personas}\n` +
      `Importe: $${Number(reserva.total).toLocaleString('es-AR')}\n` +
      `Ticket: ${reserva.numero_ticket ?? '-'}\n` +
      `Estado: ${this.estadoDe(reserva)}`
    );
  }
}