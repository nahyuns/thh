// ============================================================
// Componente: Alojamientos (vista Admin) - "tu hogar habitual"
// ============================================================
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Forma que tiene cada alojamiento
interface Alojamiento {
  id: string;
  titulo: string;
  categoria: string;
  ciudad: string;
  descripcion: string;
  precio: number;
  estado: 'Disponible' | 'Ocupado' | 'Mantenimiento';
  imagen: string;
  servicios: string[];
}

@Component({
  selector: 'app-alojamientos-admin',
  standalone: true,
  imports: [FormsModule, RouterLink], // FormsModule: buscador y filtros / RouterLink: botón publicar
  templateUrl: './alojamientos-admin.html',
  styleUrl: './alojamientos-admin.css',
})
export class AlojamientosAdmin {
  // ---------- Datos de ejemplo (después los reemplazás por tu servicio/API) ----------
  alojamientos: Alojamiento[] = [
    { id: 'ALO-001', titulo: 'Cabaña Alpina El Refugio', categoria: 'Cabaña', ciudad: 'San Carlos de Bariloche',
      descripcion: 'Hermosa cabaña alpina con vista panorámica a los lagos y montañas. Equipada full con hogar a leña y jacuzzi.',
      precio: 145, estado: 'Disponible', imagen: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800',
      servicios: ['WiFi', 'Pileta', 'Estacionamiento', 'Calefacción'] },
    { id: 'ALO-002', titulo: 'Departamento Platinum Vista Mar', categoria: 'Departamento', ciudad: 'Mar del Plata',
      descripcion: 'Departamento luminoso a pasos de la playa, con balcón y todas las comodidades para una estadía completa.',
      precio: 98, estado: 'Ocupado', imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      servicios: ['WiFi', 'Aire acond.', 'Cochera'] },
    { id: 'ALO-003', titulo: 'Villa Moderna Los Olivos', categoria: 'Casa', ciudad: 'Mendoza',
      descripcion: 'Casa de diseño moderno con piscina, amplio parque y vista a los viñedos. Ideal para grupos y familias.',
      precio: 280, estado: 'Disponible', imagen: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      servicios: ['WiFi', 'Pileta', 'Parrilla', 'Cochera'] },
    { id: 'ALO-004', titulo: 'Loft Céntrico Urban', categoria: 'Departamento', ciudad: 'Buenos Aires',
      descripcion: 'Loft de estilo industrial en pleno centro, cerca de restaurantes, teatros y transporte público.',
      precio: 75, estado: 'Mantenimiento', imagen: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      servicios: ['WiFi', 'Aire acond.', 'Cocina'] },
    { id: 'ALO-005', titulo: 'Casa de Campo La Siesta', categoria: 'Casa', ciudad: 'Cipolletti',
      descripcion: 'Casa tranquila rodeada de chacras, con galería, quincho y mucho espacio al aire libre.',
      precio: 110, estado: 'Disponible', imagen: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      servicios: ['WiFi', 'Quincho', 'Estacionamiento'] },
    { id: 'ALO-006', titulo: 'Cabaña del Lago', categoria: 'Cabaña', ciudad: 'Villa La Angostura',
      descripcion: 'Cabaña de madera junto al lago, con deck privado y chimenea. Perfecta para una escapada en pareja.',
      precio: 130, estado: 'Ocupado', imagen: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
      servicios: ['WiFi', 'Calefacción', 'Deck'] },
  ];

  // ---------- Filtros ----------
  busqueda = '';
  categoriaFiltro = '';
  estadoFiltro = '';

  // ---------- Modales ----------
  detalleSeleccionado: Alojamiento | null = null;  // alojamiento que se ve en el detalle
  eliminarSeleccionado: Alojamiento | null = null; // alojamiento que se quiere eliminar

  constructor(private router: Router) {}

  // ---------- Tarjetas de resumen (se calculan solas con la lista) ----------
  get total(): number {
    return this.alojamientos.length;
  }
  get disponibles(): number {
    return this.alojamientos.filter(a => a.estado === 'Disponible').length;
  }
  get ocupados(): number {
    return this.alojamientos.filter(a => a.estado === 'Ocupado').length;
  }
  get enMantenimiento(): number {
    return this.alojamientos.filter(a => a.estado === 'Mantenimiento').length;
  }
  get ocupacionMedia(): number {
    return this.total === 0 ? 0 : Math.round((this.ocupados / this.total) * 100);
  }

  // ---------- Lista filtrada por buscador, categoría y estado ----------
  get alojamientosFiltrados(): Alojamiento[] {
    const texto = this.busqueda.toLowerCase().trim();
    return this.alojamientos.filter(a => {
      const coincideTexto =
        a.titulo.toLowerCase().includes(texto) ||
        a.ciudad.toLowerCase().includes(texto) ||
        a.id.toLowerCase().includes(texto);
      const coincideCategoria = this.categoriaFiltro === '' || a.categoria === this.categoriaFiltro;
      const coincideEstado = this.estadoFiltro === '' || a.estado === this.estadoFiltro;
      return coincideTexto && coincideCategoria && coincideEstado;
    });
  }

  // ---------- Acciones de las cards ----------
  verDetalle(a: Alojamiento): void {
    this.detalleSeleccionado = a; // abre el modal de detalle
  }

  editar(a: Alojamiento): void {
    // Ajustá la ruta a la que uses para editar
    this.router.navigate(['/admin/alojamientos', a.id, 'editar']);
  }

  pedirEliminar(a: Alojamiento): void {
    this.eliminarSeleccionado = a; // abre el modal de confirmación
  }

  confirmarEliminar(): void {
    if (this.eliminarSeleccionado) {
      // Quita el alojamiento de la lista (con API, acá llamás a tu servicio)
      this.alojamientos = this.alojamientos.filter(a => a.id !== this.eliminarSeleccionado!.id);
    }
    this.eliminarSeleccionado = null;
  }

  cerrarModales(): void {
    this.detalleSeleccionado = null;
    this.eliminarSeleccionado = null;
  }

  // Devuelve la clase CSS según el estado (para el badge de la foto)
  claseEstado(estado: string): string {
    if (estado === 'Disponible') return 'estado-disponible';
    if (estado === 'Ocupado') return 'estado-ocupado';
    return 'estado-mantenimiento';
  }
}