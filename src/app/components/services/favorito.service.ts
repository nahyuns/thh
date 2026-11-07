import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alojamientos } from '../alojamientos/alojamientos';

// Favoritos guardados en la base, uno por usuario.
// Todas las rutas necesitan sesión iniciada (el interceptor agrega el token).
@Injectable({ providedIn: 'root' })
export class FavoritoService {
  private apiUrl = 'http://localhost/thh-api/public/favoritos';

  constructor(private http: HttpClient) {}

  // GET /favoritos: los alojamientos favoritos del usuario
  listar(): Observable<Alojamientos[]> {
    return this.http.get<Alojamientos[]>(this.apiUrl);
  }

  // POST /favoritos/agregar
  agregar(idAlojamiento: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, { alojamiento_id: idAlojamiento });
  }

  // DELETE /favoritos/eliminar/{id}   (el id es el del ALOJAMIENTO)
  eliminar(idAlojamiento: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${idAlojamiento}`);
  }
}