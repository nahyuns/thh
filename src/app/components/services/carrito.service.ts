import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaCarrito } from '../../modelos/reserva.model';

// El "carrito" son las reservas pendientes del usuario.
// El token lo agrega el interceptor.
@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = 'http://localhost/thh-api/public/carrito';

  constructor(private http: HttpClient) {}

  // GET /carrito
  ver(): Observable<RespuestaCarrito> {
    return this.http.get<RespuestaCarrito>(this.apiUrl);
  }

  // POST /carrito/agregar
  agregar(datos: {
    alojamiento_id: number;
    fecha_entrada: string;
    fecha_salida: string;
    cantidad_personas: number;
  }): Observable<{ mensaje: string; id: number; noches: number; total: number }> {
    return this.http.post<{ mensaje: string; id: number; noches: number; total: number }>(`${this.apiUrl}/agregar`, datos);
  }

  // PUT /carrito/actualizar/{id}   (el id es el de la reserva)
  actualizar(id: number, datos: { fecha_entrada?: string; fecha_salida?: string; cantidad_personas?: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, datos);
  }

  // DELETE /carrito/eliminar/{id}
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  // DELETE /carrito/vaciar
  vaciar(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vaciar`);
  }
}