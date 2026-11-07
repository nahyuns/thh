import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alojamientos } from '../../components/alojamientos/alojamientos';

// Filtros que acepta la API (todos opcionales)
export interface FiltrosAlojamiento {
  categoria?: string;
  destino?: string;      // busca en la ubicación o en el título
  ubicacion?: string;
  capacidad?: number;    // capacidad igual o mayor
  precio_min?: number;
  precio_max?: number;
  buscar?: string;       // busca en título y descripción
  orden?: 'precio_asc' | 'precio_desc';
  usuario_id?: number;   // alojamientos de un anfitrión
}

// Datos que pide la API para crear o editar un alojamiento
export interface DatosAlojamiento {
  titulo: string;
  descripcion?: string;
  ubicacion: string;
  categoria: string;                    // Montaña, Ciudad, Playa o Bosque
  precio_noche: number | string;
  capacidad: number;
  imagen?: string | null;               // nombre devuelto por subirImagen()
}

@Injectable({ providedIn: 'root' })
export class AlojamientoService {
  private apiUrl = 'http://localhost/thh-api/public/alojamientos';
  private urlUploads = 'http://localhost/thh-api/public/uploads/';

  constructor(private http: HttpClient) {}

  // GET /alojamientos?categoria=...&destino=...   (solo manda los filtros que tengan valor)
  listar(filtros: FiltrosAlojamiento = {}): Observable<Alojamientos[]> {
    let params = new HttpParams();
    for (const [clave, valor] of Object.entries(filtros)) {
      if (valor !== undefined && valor !== null && valor !== '') {
        params = params.set(clave, String(valor));
      }
    }
    return this.http.get<Alojamientos[]>(this.apiUrl, { params });
  }

  // GET /alojamientos/{id}
  verUno(id: number): Observable<Alojamientos> {
    return this.http.get<Alojamientos>(`${this.apiUrl}/${id}`);
  }

  // POST /alojamientos  (anfitrión o admin)
  crear(datos: DatosAlojamiento): Observable<{ mensaje: string; id: number; imagen: string | null }> {
    return this.http.post<{ mensaje: string; id: number; imagen: string | null }>(this.apiUrl, datos);
  }

  // PUT /alojamientos/{id}  (dueño o admin)
  editar(id: number, datos: DatosAlojamiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }

  // DELETE /alojamientos/{id}  (dueño o admin)
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // POST /alojamientos/imagen: sube la foto y devuelve su nombre
  subirImagen(archivo: File): Observable<{ mensaje: string; imagen: string }> {
    const datos = new FormData();
    datos.append('imagen', archivo); // "imagen" = el campo que lee PHP en $_FILES
    return this.http.post<{ mensaje: string; imagen: string }>(`${this.apiUrl}/imagen`, datos);
  }

  // Arma la dirección completa de una imagen. Si el alojamiento no tiene,
  // usa una imagen por defecto (agregá assets/sin-imagen.jpg al proyecto).
  urlImagen(nombre: string | null): string {
    return nombre ? this.urlUploads + nombre : 'assets/sin-imagen.jpg';
  }
}