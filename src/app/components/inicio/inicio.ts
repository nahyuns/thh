import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlojamientoService } from '../services/alojamiento.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  categoria = 'Playa';
  destino = '';
  entrada = '';
  salida = '';
  huespedes = 2;

  // Opciones del desplegable "Cantidad de personas"
  opcionesPersonas = [1, 2, 3, 4, 5, 6];

  // Los destinos que hay en la base, agrupados por categoría.
  // Se llena al abrir la página (cambia cuando responde la API, por eso es una señal).
  destinosPorCategoria = signal<Record<string, string[]>>({});

  get destinosDisponibles(): string[] {
    return this.destinosPorCategoria()[this.categoria] || [];
  }

  constructor(private router: Router, private alojamientoService: AlojamientoService) { }

  ngOnInit(): void {
    // GET /alojamientos: de cada ubicación se saca la ciudad ("Bariloche · Río Negro" → "Bariloche")
    this.alojamientoService.listar().subscribe({
      next: lista => {
        const mapa: Record<string, string[]> = {};

        for (const a of lista) {
          if (!a.categoria || !a.ubicacion) continue;

          const ciudad = a.ubicacion.split('·')[0].trim();

          if (!mapa[a.categoria]) {
            mapa[a.categoria] = [];
          }
          if (!mapa[a.categoria].includes(ciudad)) {
            mapa[a.categoria].push(ciudad);
          }
        }

        for (const categoria of Object.keys(mapa)) {
          mapa[categoria].sort();
        }
        this.destinosPorCategoria.set(mapa);
      },
      // Si falla la conexión, el desplegable de destinos queda vacío
      error: () => {}
    });
  }

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