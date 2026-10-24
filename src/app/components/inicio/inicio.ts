import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  categoria = 'Playa';
  destino = '';
  entrada = '';
  salida = '';
  huespedes = 2 & 1;

  destinosPorCategoria: { [categoria: string]: string[] } = {
    Playa: [
      'Las Grutas',
      'San Antonio Oeste',
      'Monte Hermoso',
    ],

    Bosque: [
      'Bariloche',
      'Dina Huapi',
    ],

    Montaña: [
      'Bariloche',
      'Dina Huapi',
    ],

    Ciudad: [
      'Buenos Aires'
    ]
  };

  get destinosDisponibles(): string[] {
    return this.destinosPorCategoria[this.categoria] || [];
  }

  constructor(private router: Router) { }

  buscarAlojamientos(): void {

    if (this.entrada && this.salida && this.salida <= this.entrada) {
      alert('La fecha de salida debe ser posterior a la fecha de entrada.');
      return;
    }

    this.router.navigate(['/alojamientos'], {
      queryParams: {
        categoria: this.categoria,
        destino: this.destino,
        entrada: this.entrada,
        salida: this.salida,
        huespedes: this.huespedes
      }
    });
  }
}
