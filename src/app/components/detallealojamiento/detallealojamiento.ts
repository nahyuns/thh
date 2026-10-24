import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Alojamiento {
  id: string;
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
  alojamientos: Alojamiento[] = [
    {
      id: 'montana1',
      nombre: 'Cabaña Vista al Cerro',
      categoria: 'Montaña',
      ubicacion: 'Bariloche',
      imagen: 'assets/montana1.jpg',
      descripcion: 'Una cabaña ideal para descansar y disfrutar de la naturaleza.',
      huespedes: 2,
      precio: 85000
    },
    {
      id: 'montana2',
      nombre: 'Refugio del Bosque',
      categoria: 'Montaña',
      ubicacion: 'Bariloche',
      imagen: 'assets/montana2.jpg',
      descripcion: 'Un refugio acogedor rodeado de paisajes naturales.',
      huespedes: 4,
      precio: 110000
    },
    {
      id: 'montana3',
      nombre: 'Cabaña Los Coihues',
      categoria: 'Montaña',
      ubicacion: 'Dina Huapi',
      imagen: 'assets/montana3.jpg',
      descripcion: 'Un espacio tranquilo para disfrutar una escapada.',
      huespedes: 3,
      precio: 92000
    },
    {
      id: 'ciudad1',
      nombre: 'Departamento Palermo',
      categoria: 'Ciudad',
      ubicacion: 'Buenos Aires · CABA',
      imagen: 'assets/ciudad1.jpg',
      descripcion: 'Un departamento cómodo para conocer la ciudad.',
      huespedes: 2,
      precio: 75000
    },
    {
      id: 'ciudad2',
      nombre: 'Loft en San Telmo',
      categoria: 'Ciudad',
      ubicacion: 'Buenos Aires · CABA',
      imagen: 'assets/ciudad2.jpg',
      descripcion: 'Un loft moderno en una zona llena de historia.',
      huespedes: 2,
      precio: 82000
    },
    {
      id: 'ciudad3',
      nombre: 'Departamento Centro',
      categoria: 'Ciudad',
      ubicacion: 'La Plata · Buenos Aires',
      imagen: 'assets/ciudad3.jpg',
      descripcion: 'Un departamento práctico para recorrer la ciudad.',
      huespedes: 3,
      precio: 65000
    },
    {
      id: 'playa1',
      nombre: 'Departamento Vista al Mar',
      categoria: 'Playa',
      ubicacion: 'Las Grutas',
      imagen: 'assets/playa1.jpg',
      descripcion: 'Disfrutá de una estadía cerca del mar.',
      huespedes: 2,
      precio: 85000
    },
    {
      id: 'playa2',
      nombre: 'Refugio de la Costa',
      categoria: 'Playa',
      ubicacion: 'San Antonio Oeste',
      imagen: 'assets/playa2.jpg',
      descripcion: 'Un lugar cómodo para disfrutar de la costa.',
      huespedes: 3,
      precio: 78000
    },
    {
      id: 'playa3',
      nombre: 'Casa Arena',
      categoria: 'Playa',
      ubicacion: 'Monte Hermoso',
      imagen: 'assets/playa3.jpg',
      descripcion: 'Una casa ideal para compartir unas vacaciones.',
      huespedes: 4,
      precio: 95000
    },
    {
      id: 'bosque1',
      nombre: 'Cabaña Bosque Andino',
      categoria: 'Bosque',
      ubicacion: 'Bariloche',
      imagen: 'assets/bosque1.jpg',
      descripcion: 'Una cabaña rodeada de vegetación y tranquilidad.',
      huespedes: 2,
      precio: 88000
    },
    {
      id: 'bosque2',
      nombre: 'Refugio Los Coihues',
      categoria: 'Bosque',
      ubicacion: 'Bariloche',
      imagen: 'assets/bosque2.jpg',
      descripcion: 'Un refugio para descansar en contacto con la naturaleza.',
      huespedes: 4,
      precio: 115000
    },
    {
      id: 'bosque3',
      nombre: 'Cabaña Raíces del Sur',
      categoria: 'Bosque',
      ubicacion: 'Dina Huapi',
      imagen: 'assets/bosque3.jpg',
      descripcion: 'Una estadía tranquila entre paisajes patagónicos.',
      huespedes: 3,
      precio: 92000
    }
  ];

  alojamiento?: Alojamiento;

  nombreCliente = '';
  email = '';
  entrada = '';
  salida = '';
  cantidadHuespedes = 1;

  mensajeError = '';
  reservaConfirmada = false;
  numeroReserva = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.alojamiento = this.alojamientos.find(a => a.id === id);
    });
  }

  get noches(): number {
    if (!this.entrada || !this.salida) return 0;

    const inicio = new Date(this.entrada + 'T00:00:00');
    const fin = new Date(this.salida + 'T00:00:00');

    return Math.round(
      (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  get total(): number {
    return this.noches * (this.alojamiento?.precio ?? 0);
  }

  get fechaMinima(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  confirmarReserva(): void {
    this.mensajeError = '';

    if (!this.alojamiento) {
      this.mensajeError = 'No se encontró el alojamiento.';
      return;
    }

    if (
      !this.nombreCliente.trim() ||
      !this.email.trim() ||
      !this.entrada ||
      !this.salida
    ) {
      this.mensajeError = 'Completá todos los campos.';
      return;
    }

    if (!this.email.includes('@')) {
      this.mensajeError = 'Ingresá un correo electrónico válido.';
      return;
    }

    if (this.entrada < this.fechaMinima) {
      this.mensajeError = 'La entrada no puede ser una fecha pasada.';
      return;
    }

    if (this.noches <= 0) {
      this.mensajeError = 'La salida debe ser posterior a la entrada.';
      return;
    }

    if (
      this.cantidadHuespedes < 1 ||
      this.cantidadHuespedes > this.alojamiento.huespedes
    ) {
      this.mensajeError =
        `Este alojamiento admite hasta ${this.alojamiento.huespedes} huéspedes.`;
      return;
    }

    this.numeroReserva =
      'HSP-' + Date.now().toString().slice(-8);

    this.reservaConfirmada = true;
  }

  imprimirTicket(): void {
    window.print();
  }
}
