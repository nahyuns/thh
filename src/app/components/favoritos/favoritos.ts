
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService } from '../services/favoritos';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {
  alojamientos = [
    {
      id: 'montana1',
      nombre: 'Cabaña Vista al Cerro',
      img: 'assets/montana1.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Una cabaña cálida rodeada de naturaleza y montañas.'
    },
    {
      id: 'montana2',
      nombre: 'Refugio del Bosque',
      img: 'assets/montana2.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Un espacio tranquilo entre árboles y paisajes de montaña.'
    },
    {
      id: 'montana3',
      nombre: 'Cabaña De las mañanas',
      img: 'assets/montana3.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Una cabaña acogedora junto al río.'
    },
    {
      id: 'ciudad1',
      nombre: 'Departamento Palermo',
      img: 'assets/ciudad1.jpg',
      ubicacion: 'Buenos Aires · CABA',
      descripcion: 'Un espacio moderno cerca de restaurantes y parques.'
    },
    {
      id: 'ciudad2',
      nombre: 'Loft en San Telmo',
      img: 'assets/ciudad2.jpg',
      ubicacion: 'Buenos Aires · CABA',
      descripcion: 'Un espacio elegante en el corazón de la ciudad.'
    },
    {
      id: 'ciudad3',
      nombre: 'Departamento Centro',
      img: 'assets/ciudad3.jpg',
      ubicacion: 'Buenos Aires · CABA',
      descripcion: 'Un espacio funcional en el barrio de Belgrano.'
    },

    {
      id: 'playa1',
      nombre: 'Departamento Vista al Mar',
      img: 'assets/playa1.jpg',
      ubicacion: 'Las Grutas · Río Negro',
      descripcion: 'Un espacio luminoso cerca de la playa y el mar.'
    }, 
    {
      id: 'playa2',
      nombre: 'Refugio de la Costa',
      img: 'assets/playa2.jpg',
      ubicacion: 'Las Grutas · Río Negro',
      descripcion: 'Una cabaña acogedora junto a la orilla del río.'
    },
    {
      id: 'playa3',
      nombre: 'Casa Arena',
      img: 'assets/playa3.jpg',
      ubicacion: 'Las Grutas · Río Negro',
      descripcion: 'Una cabaña acogedora junto a la orilla del mar.'
    },
    {
      id: 'bosque1',
      nombre: 'Cabaña Bosque Andino',
      img: 'assets/bosque1.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Una cabaña cálida entre árboles nativos.'
    },
    {
      id: 'bosque2',
      nombre: 'Refugio Los Coihues',
      img: 'assets/bosque2.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Un espacio tranquilo entre árboles y paisajes de montaña.'
    },
    {
      id: 'bosque3',
      nombre: 'Cabaña Raíces del Sur',
      img: 'assets/bosque3.jpg',
      ubicacion: 'Bariloche · Río Negro',
      descripcion: 'Una cabaña mágica rodeada de árboles y paisajes de montaña.'
    }
  ];

  alojamientosFavoritos: typeof this.alojamientos = [];

  constructor(private favoritosService: FavoritosService) {
    this.actualizarFavoritos();
  }

  actualizarFavoritos(): void {
    const ids = this.favoritosService.obtenerFavoritos();

    this.alojamientosFavoritos = this.alojamientos.filter(
      alojamiento => ids.includes(alojamiento.id)
    );
  }

  quitarFavorito(id: string): void {
    this.favoritosService.alternarFavorito(id);
    this.actualizarFavoritos();
  }
}
