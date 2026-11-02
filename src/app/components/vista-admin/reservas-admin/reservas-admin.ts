

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Reserva {
  id: number;
  huesped: string;
  alojamiento: string;
  checkIn: string;
  checkOut: string;
  estado: 'Confirmada' | 'Pendiente' | 'Cancelada';
}

@Component({
  selector: 'app-reservas-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas-admin.html',
  styleUrl: './reservas-admin.css'
})

export class ReservasAdmin {

  // LISTA DE RESERVAS
  reservas: Reserva[] = [
    {
      id: 1,
      huesped: 'María López',
      alojamiento: 'Cabaña del Bosque',
      checkIn: '2026-11-12',
      checkOut: '2026-11-16',
      estado: 'Confirmada'
    },
    {
      id: 2,
      huesped: 'Juan Pérez',
      alojamiento: 'Departamento Centro',
      checkIn: '2026-11-14',
      checkOut: '2026-11-17',
      estado: 'Pendiente'
    },
    {
      id: 3,
      huesped: 'Ana García',
      alojamiento: 'Cabaña del Lago',
      checkIn: '2026-11-15',
      checkOut: '2026-11-18',
      estado: 'Confirmada'
    },
    {
      id: 4,
      huesped: 'Lucas Fernández',
      alojamiento: 'Departamento Playa',
      checkIn: '2026-11-18',
      checkOut: '2026-11-21',
      estado: 'Cancelada'
    },
    {
      id: 5,
      huesped: 'Sofía Martínez',
      alojamiento: 'Cabaña del Bosque',
      checkIn: '2026-11-20',
      checkOut: '2026-11-23',
      estado: 'Pendiente'
    },
    {
      id: 6,
      huesped: 'Pedro Gómez',
      alojamiento: 'Cabaña del Lago',
      checkIn: '2026-11-24',
      checkOut: '2026-11-27',
      estado: 'Confirmada'
    },
    {
      id: 7,
      huesped: 'Carla Rodríguez',
      alojamiento: 'Departamento Centro',
      checkIn: '2026-11-26',
      checkOut: '2026-11-29',
      estado: 'Pendiente'
    },
    {
      id: 8,
      huesped: 'Martín Díaz',
      alojamiento: 'Departamento Playa',
      checkIn: '2026-11-28',
      checkOut: '2026-12-02',
      estado: 'Confirmada'
    },
    {
      id: 9,
      huesped: 'Laura Torres',
      alojamiento: 'Cabaña del Bosque',
      checkIn: '2026-12-03',
      checkOut: '2026-12-06',
      estado: 'Cancelada'
    },
    {
      id: 10,
      huesped: 'Federico Ruiz',
      alojamiento: 'Cabaña del Lago',
      checkIn: '2026-12-05',
      checkOut: '2026-12-09',
      estado: 'Confirmada'
    }
  ];


  // BUSCADOR Y FILTROS
  busqueda: string = '';
  filtroEstado: string = 'Todos';
  fechaDesde: string = '';
  fechaHasta: string = '';


  // PAGINACIÓN
  paginaActual: number = 1;
  reservasPorPagina: number = 5;


  // RESERVA SELECCIONADA
  reservaSeleccionada: Reserva | null = null;


  // ESTADÍSTICAS
  get totalReservas(): number {
    return this.reservas.length;
  }

  get totalConfirmadas(): number {
    return this.reservas.filter(
      reserva => reserva.estado === 'Confirmada'
    ).length;
  }

  get totalPendientes(): number {
    return this.reservas.filter(
      reserva => reserva.estado === 'Pendiente'
    ).length;
  }

  get totalCanceladas(): number {
    return this.reservas.filter(
      reserva => reserva.estado === 'Cancelada'
    ).length;
  }


  // FILTRAR RESERVAS
  get reservasFiltradas(): Reserva[] {

    return this.reservas.filter(reserva => {

      const texto = this.busqueda.toLowerCase().trim();

      const coincideBusqueda =
        reserva.huesped.toLowerCase().includes(texto) ||
        reserva.alojamiento.toLowerCase().includes(texto);

      const coincideEstado =
        this.filtroEstado === 'Todos' ||
        reserva.estado === this.filtroEstado;

      const coincideFechaDesde =
        !this.fechaDesde || reserva.checkIn >= this.fechaDesde;

      const coincideFechaHasta =
        !this.fechaHasta || reserva.checkIn <= this.fechaHasta;

      return coincideBusqueda &&
        coincideEstado &&
        coincideFechaDesde &&
        coincideFechaHasta;

    });

  }


  // RESERVAS DE LA PÁGINA ACTUAL
  get reservasPaginadas(): Reserva[] {

    const inicio = (this.paginaActual - 1) * this.reservasPorPagina;

    const fin = inicio + this.reservasPorPagina;

    return this.reservasFiltradas.slice(inicio, fin);

  }


  // CANTIDAD DE PÁGINAS
  get totalPaginas(): number {
    return Math.ceil(
      this.reservasFiltradas.length / this.reservasPorPagina
    );
  }


  // NÚMEROS DE PÁGINA
  get paginas(): number[] {
    return Array.from(
      { length: this.totalPaginas },
      (_, i) => i + 1
    );
  }


  // ACTUALIZAR FILTROS
  actualizarFiltros(): void {
    this.paginaActual = 1;
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
  verReserva(reserva: Reserva): void {

    alert(
      `DATOS DE LA RESERVA\n\n` +
      `Huésped: ${reserva.huesped}\n` +
      `Alojamiento: ${reserva.alojamiento}\n` +
      `Check-in: ${this.formatearFecha(reserva.checkIn)}\n` +
      `Check-out: ${this.formatearFecha(reserva.checkOut)}\n` +
      `Estado: ${reserva.estado}`
    );

  }


  // NUEVA RESERVA
  nuevaReserva(): void {

    const huesped = prompt('Ingresá el nombre del huésped:');

    if (huesped === null) return;

    if (!huesped.trim()) {
      alert('El nombre del huésped es obligatorio.');
      return;
    }

    const alojamiento = prompt('Ingresá el alojamiento:');

    if (alojamiento === null) return;

    if (!alojamiento.trim()) {
      alert('El alojamiento es obligatorio.');
      return;
    }

    const checkIn = prompt('Fecha de check-in (AAAA-MM-DD):');

    if (checkIn === null) return;

    if (!this.fechaValida(checkIn)) {
      alert('La fecha de check-in no es válida.');
      return;
    }

    const checkOut = prompt('Fecha de check-out (AAAA-MM-DD):');

    if (checkOut === null) return;

    if (!this.fechaValida(checkOut) || checkOut <= checkIn) {
      alert('La fecha de check-out debe ser posterior al check-in.');
      return;
    }

    const nuevaReserva: Reserva = {
      id: Math.max(0, ...this.reservas.map(r => r.id)) + 1,
      huesped: huesped.trim(),
      alojamiento: alojamiento.trim(),
      checkIn,
      checkOut,
      estado: 'Pendiente'
    };

    this.reservas.push(nuevaReserva);

    this.actualizarFiltros();

    alert('¡Reserva creada correctamente!');

  }


  // EDITAR RESERVA
  editarReserva(reserva: Reserva): void {

    const huesped = prompt(
      'Modificar nombre del huésped:',
      reserva.huesped
    );

    if (huesped === null) return;

    if (!huesped.trim()) {
      alert('El nombre del huésped es obligatorio.');
      return;
    }

    const alojamiento = prompt(
      'Modificar alojamiento:',
      reserva.alojamiento
    );

    if (alojamiento === null) return;

    if (!alojamiento.trim()) {
      alert('El alojamiento es obligatorio.');
      return;
    }

    const checkIn = prompt(
      'Modificar check-in (AAAA-MM-DD):',
      reserva.checkIn
    );

    if (checkIn === null) return;

    if (!this.fechaValida(checkIn)) {
      alert('La fecha de check-in no es válida.');
      return;
    }

    const checkOut = prompt(
      'Modificar check-out (AAAA-MM-DD):',
      reserva.checkOut
    );

    if (checkOut === null) return;

    if (!this.fechaValida(checkOut) || checkOut <= checkIn) {
      alert('La fecha de check-out debe ser posterior al check-in.');
      return;
    }

    const estados: Reserva['estado'][] = [
      'Confirmada',
      'Pendiente',
      'Cancelada'
    ];

    const estadoElegido = prompt(
      'Estado de la reserva:\n1. Confirmada\n2. Pendiente\n3. Cancelada',
      String(estados.indexOf(reserva.estado) + 1)
    );

    if (estadoElegido === null) return;

    const estado = estados[Number(estadoElegido) - 1];

    if (!estado) {
      alert('El estado seleccionado no es válido.');
      return;
    }

    reserva.huesped = huesped.trim();
    reserva.alojamiento = alojamiento.trim();
    reserva.checkIn = checkIn;
    reserva.checkOut = checkOut;
    reserva.estado = estado;

    this.actualizarFiltros();

    alert('¡Reserva modificada correctamente!');

  }


  // ELIMINAR RESERVA
  eliminarReserva(reserva: Reserva): void {

    const confirmar = confirm(
      `¿Estás seguro de eliminar la reserva de ${reserva.huesped}?`
    );

    if (!confirmar) return;

    this.reservas = this.reservas.filter(
      r => r.id !== reserva.id
    );

    if (this.paginaActual > this.totalPaginas && this.paginaActual > 1) {
      this.paginaActual--;
    }

    alert('Reserva eliminada correctamente.');

  }


  // VALIDAR FECHAS
  fechaValida(fecha: string): boolean {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return false;
    }

    const fechaObjeto = new Date(`${fecha}T00:00:00`);

    return !isNaN(fechaObjeto.getTime()) &&
      fechaObjeto.toISOString().slice(0, 10) === fecha;

  }

}

