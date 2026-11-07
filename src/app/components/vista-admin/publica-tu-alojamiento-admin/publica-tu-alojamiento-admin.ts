import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientoService } from '../../services/alojamiento.service';

// Este formulario sirve para PUBLICAR (/admin/publica-tu-alojamiento)
// y para EDITAR (/admin/alojamientos/5/editar): si la dirección trae un id, es edición.
@Component({
  imports: [FormsModule],
  selector: 'app-publica-tu-alojamiento-admin',
  styleUrl: './publica-tu-alojamiento-admin.css',
  templateUrl: './publica-tu-alojamiento-admin.html',
})
export class PublicaTuAlojamientoAdmin implements OnInit {
  // Lo que escribe el anfitrión (conectado al HTML con ngModel)
  titulo = '';
  categoria = 'Montaña';
  descripcion = '';
  ubicacion = '';
  capacidad = 1;
  precio: number | null = null;

  // La foto nueva elegida (si eligió alguna) y la que ya tenía (en edición)
  private archivo: File | null = null;
  private imagenActual: string | null = null;

  // Cambian de forma asíncrona, por eso son señales
  idEdicion = signal<number | null>(null);   // null = estamos publicando uno nuevo
  cargandoDatos = signal(false);
  vistaPrevia = signal<string | null>(null);
  enviando = signal(false);
  error = signal('');

  constructor(
    private alojamientoService: AlojamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return; // publicar: formulario vacío
    }

    // Editar: se carga el alojamiento y se completa el formulario
    this.idEdicion.set(Number(id));
    this.cargandoDatos.set(true);

    this.alojamientoService.verUno(Number(id)).subscribe({
      next: a => {
        this.titulo = a.titulo ?? '';
        this.categoria = a.categoria ?? 'Montaña';
        this.descripcion = a.descripcion ?? '';
        this.ubicacion = a.ubicacion ?? '';
        this.capacidad = Number(a.capacidad ?? 1);
        this.precio = Number(a.precio_noche);
        const imagen: string | null = typeof (a.imagen as unknown) === 'string' ? String(a.imagen) : null;
        this.imagenActual = imagen;
        this.vistaPrevia.set(imagen ? this.alojamientoService.urlImagen(imagen) : null);
        this.cargandoDatos.set(false);
      },
      error: () => {
        this.error.set('No encontramos el alojamiento que querés editar.');
        this.cargandoDatos.set(false);
      }
    });
  }

  // Se ejecuta cuando se elige un archivo en <input type="file">
  alElegirFoto(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files && input.files.length ? input.files[0] : null;
    this.error.set('');

    if (archivo) {
      // La API acepta JPG, PNG o WEBP de hasta 2 MB: se avisa antes de intentar subirla
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(archivo.type)) {
        this.error.set('La foto tiene que ser JPG, PNG o WEBP.');
        input.value = '';
        return;
      }
      if (archivo.size > 2 * 1024 * 1024) {
        this.error.set('La foto no puede pesar más de 2 MB.');
        input.value = '';
        return;
      }
    }

    this.archivo = archivo;

    // Vista previa: la foto elegida o, si no hay, la que ya tenía
    const anterior = this.vistaPrevia();
    if (anterior && anterior.startsWith('blob:')) {
      URL.revokeObjectURL(anterior);
    }
    if (archivo) {
      this.vistaPrevia.set(URL.createObjectURL(archivo));
    } else {
      this.vistaPrevia.set(this.imagenActual ? this.alojamientoService.urlImagen(this.imagenActual) : null);
    }
  }

  // Botón "Publicar alojamiento" / "Guardar cambios"
  publicar(): void {
    this.error.set('');

    if (!this.titulo.trim() || !this.ubicacion.trim()) {
      this.error.set('Completá el nombre y la ubicación del alojamiento.');
      return;
    }
    if (!this.precio || this.precio <= 0) {
      this.error.set('Ingresá un precio por noche mayor a 0.');
      return;
    }
    if (!this.capacidad || this.capacidad < 1) {
      this.error.set('La capacidad tiene que ser de 1 huésped o más.');
      return;
    }

    this.enviando.set(true);

    if (this.archivo) {
      // Primero se sube la foto: la API devuelve el nombre con el que quedó guardada
      this.alojamientoService.subirImagen(this.archivo).subscribe({
        next: respuesta => this.guardar(respuesta.imagen),
        error: e => this.fallar(e, 'No se pudo subir la foto.')
      });
    } else {
      // Sin foto nueva: en edición queda la que tenía
      this.guardar(this.imagenActual);
    }
  }

  // Segundo paso: se guarda el alojamiento (con el nombre de la foto, si hay)
  private guardar(imagen: string | null): void {
    const datos = {
      titulo: this.titulo.trim(),
      descripcion: this.descripcion.trim(),
      ubicacion: this.ubicacion.trim(),
      categoria: this.categoria,
      precio_noche: this.precio!,
      capacidad: this.capacidad,
      imagen
    };

    const id = this.idEdicion();

    if (id !== null) {
      // PUT /alojamientos/{id}
      this.alojamientoService.editar(id, datos).subscribe({
        next: () => {
          this.enviando.set(false);
          this.router.navigate(['/admin/alojamientos']);
        },
        error: e => this.fallar(e, 'No se pudieron guardar los cambios.')
      });
    } else {
      // POST /alojamientos
      this.alojamientoService.crear(datos).subscribe({
        next: respuesta => {
          this.enviando.set(false);
          // Lo lleva a ver cómo quedó publicado
          this.router.navigate(['/detallealojamiento', respuesta.id]);
        },
        error: e => this.fallar(e, 'No se pudo publicar el alojamiento.')
      });
    }
  }

  private fallar(e: any, mensajePorDefecto: string): void {
    this.enviando.set(false);
    // Si la API contestó con un motivo (por ejemplo "Falta el campo: titulo"), lo mostramos
    this.error.set(e.error?.error ?? mensajePorDefecto);
  }
}