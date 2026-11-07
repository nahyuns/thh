// ============================================================
// Componente: Alojamientos (vista del panel)
// El anfitrión ve SUS alojamientos; el admin ve todos.
// ============================================================
import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Alojamiento } from '../../../modelos/alojamiento.model';
import { AlojamientoService } from '../../services/alojamiento.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-alojamientos-admin',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink], // FormsModule: buscador y filtros / RouterLink: botón publicar
  templateUrl: './alojamientos-admin.html',
  styleUrl: './alojamientos-admin.css',
})
export class AlojamientosAdmin implements OnInit {
  // Cambian cuando responde la API, por eso son señales
  alojamientos = signal<Alojamiento[]>([]);
  cargando = signal(true);
  error = signal('');
  eliminando = signal(false);
  errorEliminar = signal('');

  // ---------- Filtros ----------
  busqueda = '';
  categoriaFiltro = '';
  ordenFiltro = '';

  // ---------- Modales ----------
  detalleSeleccionado: Alojamiento | null = null;  // alojamiento que se ve en el detalle
  eliminarSeleccionado: Alojamiento | null = null; // alojamiento que se quiere eliminar

  constructor(
    private alojamientoService: AlojamientoService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  // GET /alojamientos (el anfitrión pide solo los suyos con ?usuario_id=)
  cargar(): void {
    const filtros = this.auth.esAdmin() ? {} : { usuario_id: this.auth.usuarioId() ?? undefined };

    this.alojamientoService.listar(filtros).subscribe({
      next: lista => {
        this.alojamientos.set(lista as unknown as Alojamiento[]);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No pudimos cargar los alojamientos. Revisá que el servidor esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  // ---------- Tarjetas de resumen (se calculan solas con la lista) ----------
  get total(): number {
    return this.alojamientos().length;
  }
  get precioPromedio(): number {
    if (this.total === 0) return 0;
    const suma = this.alojamientos().reduce((acum, a) => acum + Number(a.precio_noche), 0);
    return Math.round(suma / this.total);
  }
  get capacidadTotal(): number {
    return this.alojamientos().reduce((acum, a) => acum + a.capacidad, 0);
  }
  get cantidadCategorias(): number {
    return new Set(this.alojamientos().map(a => a.categoria)).size;
  }

  // ---------- Lista filtrada por buscador y categoría, y ordenada ----------
  get alojamientosFiltrados(): Alojamiento[] {
    const texto = this.busqueda.toLowerCase().trim();

    let lista = this.alojamientos().filter(a => {
      const coincideTexto =
        a.titulo.toLowerCase().includes(texto) ||
        a.ubicacion.toLowerCase().includes(texto) ||
        String(a.id).includes(texto);
      const coincideCategoria = this.categoriaFiltro === '' || a.categoria === this.categoriaFiltro;
      return coincideTexto && coincideCategoria;
    });

    if (this.ordenFiltro === 'precio_asc') {
      lista = [...lista].sort((a, b) => Number(a.precio_noche) - Number(b.precio_noche));
    } else if (this.ordenFiltro === 'precio_desc') {
      lista = [...lista].sort((a, b) => Number(b.precio_noche) - Number(a.precio_noche));
    }
    return lista;
  }

  imagenUrl(a: Alojamiento): string {
    return this.alojamientoService.urlImagen(a.imagen);
  }

  // ---------- Acciones de las cards ----------
  verDetalle(a: Alojamiento): void {
    this.detalleSeleccionado = a; // abre el modal de detalle
  }

  // Editar usa el mismo formulario de publicar (/admin/alojamientos/5/editar)
  editar(a: Alojamiento): void {
    this.cerrarModales();
    this.router.navigate(['/admin/alojamientos', a.id, 'editar']);
  }

  pedirEliminar(a: Alojamiento): void {
    this.errorEliminar.set('');
    this.eliminarSeleccionado = a; // abre el modal de confirmación
  }

  // DELETE /alojamientos/{id}
  confirmarEliminar(): void {
    const a = this.eliminarSeleccionado;
    if (!a) return;

    this.eliminando.set(true);
    this.errorEliminar.set('');

    this.alojamientoService.eliminar(a.id).subscribe({
      next: () => {
        this.eliminando.set(false);
        this.eliminarSeleccionado = null;
        this.alojamientos.update(lista => lista.filter(x => x.id !== a.id));
      },
      error: e => {
        this.eliminando.set(false);
        // Por ejemplo: "No se puede eliminar: el alojamiento tiene reservas"
        this.errorEliminar.set(e.error?.error ?? 'No se pudo eliminar el alojamiento.');
      }
    });
  }

  cerrarModales(): void {
    this.detalleSeleccionado = null;
    this.eliminarSeleccionado = null;
    this.errorEliminar.set('');
  }
}