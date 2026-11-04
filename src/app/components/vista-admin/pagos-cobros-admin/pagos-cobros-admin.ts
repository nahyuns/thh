import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pagos-cobros-admin',
  styleUrl: './pagos-cobros-admin.css',
  templateUrl: './pagos-cobros-admin.html',
})
export class PagosCobrosAdmin {

  //Utilice el mismo arreglo de reservas para la tabla de pagos y cobros
  movimientos = [
    {
      id: 1,
      huesped: 'María López',
      alojamiento: 'Cabaña del Bosque',
      fecha: '2026-11-12',
      metodo: 'Transferencia',
      importe: 85000,
      estado: 'completado'
    },
    {
      id: 2,
      huesped: 'Juan Pérez',
      alojamiento: 'Departamento Centro',
      fecha: '2026-11-14',
      metodo: 'Tarjeta',
      importe: 120000,
      estado: 'pendiente'
    },
    {
      id: 3,
      huesped: 'Ana García',
      alojamiento: 'Cabaña del Lago',
      fecha: '2026-11-15',
      metodo: 'Mercado Pago',
      importe: 95000,
      estado: 'completado'
    },
    {
      id: 4,
      huesped: 'Lucas Fernández',
      alojamiento: 'Departamento Playa',
      fecha: '2026-11-18',
      metodo: 'Transferencia',
      importe: 75000,
      estado: 'cancelado'
    },
    {
      id: 5,
      huesped: 'Sofía Martínez',
      alojamiento: 'Cabaña del Bosque',
      fecha: '2026-11-20',
      metodo: 'Tarjeta',
      importe: 110000,
      estado: 'pendiente'
    },
    {
      id: 6,
      huesped: 'Pedro Gómez',
      alojamiento: 'Cabaña del Lago',
      fecha: '2026-11-24',
      metodo: 'Transferencia',
      importe: 90000,
      estado: 'completado'
    },
    {
      id: 7,
      huesped: 'Carla Rodríguez',
      alojamiento: 'Departamento Centro',
      fecha: '2026-11-26',
      metodo: 'Mercado Pago',
      importe: 105000,
      estado: 'pendiente'
    },
    {
      id: 8,
      huesped: 'Martín Díaz',
      alojamiento: 'Departamento Playa',
      fecha: '2026-11-28',
      metodo: 'Tarjeta',
      importe: 130000,
      estado: 'completado'
    },
    {
      id: 9,
      huesped: 'Laura Torres',
      alojamiento: 'Cabaña del Bosque',
      fecha: '2026-12-03',
      metodo: 'Transferencia',
      importe: 80000,
      estado: 'cancelado'
    },
    {
      id: 10,
      huesped: 'Federico Ruiz',
      alojamiento: 'Cabaña del Lago',
      fecha: '2026-12-05',
      metodo: 'Tarjeta',
      importe: 115000,
      estado: 'completado'
    }
  ];

  // Variables del buscador y filtro
  textoBusqueda = '';
  estadoFiltro = '';

  //Busca por el nombre del huesped o alojamiento
  buscar(event: Event) {
    this.textoBusqueda = (event.target as HTMLInputElement).value.toLowerCase();
  }

  //Filtra por estado de pago
  filtrarEstado(event: Event) {
    this.estadoFiltro = (event.target as HTMLSelectElement).value;
  }

  //Filtro para buscar
  get movimientosFiltrados() {
    return this.movimientos.filter(movimiento => {

      const coincideBusqueda =
        movimiento.huesped.toLowerCase().includes(this.textoBusqueda) ||
        movimiento.alojamiento.toLowerCase().includes(this.textoBusqueda);

      const coincideEstado =
        this.estadoFiltro === '' || movimiento.estado === this.estadoFiltro;

      return coincideBusqueda && coincideEstado;
    });
  }

  //Calcula el total recaudado
  get totalRecaudado() {
    return this.movimientos
      .filter(m => m.estado === 'completado')
      .reduce((total, m) => total + m.importe, 0);
  }

  //Calcula los pagos pendientes
  get pagosPendientes() {
    return this.movimientos
      .filter(m => m.estado === 'pendiente')
      .reduce((total, m) => total + m.importe, 0);
  }

  //Cuenta las operaciones
  get cantidadOperaciones() {
    return this.movimientos.length;
  }

  //Da formato a los importes
  formatearImporte(importe: number) {
    return '$' + importe.toLocaleString('es-AR');
  }

}
