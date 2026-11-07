import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompraFinalizada, CompraHistorial, ReservaRecibida } from '../../modelos/reserva.model';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private apiUrl = 'http://localhost/thh-api/public/compras';

  constructor(private http: HttpClient) {}

  // POST /compras/finalizar: confirma todas las reservas pendientes y crea sus tickets
  finalizar(): Observable<{ mensaje: string; compras: CompraFinalizada[] }> {
    return this.http.post<{ mensaje: string; compras: CompraFinalizada[] }>(`${this.apiUrl}/finalizar`, {});
  }

  // GET /compras/recibidas: las reservas confirmadas en los alojamientos del anfitrión
  // (el admin ve las de todos). Es la fuente de las pantallas Reservas y Pagos del panel.
  recibidas(): Observable<ReservaRecibida[]> {
    return this.http.get<ReservaRecibida[]>(`${this.apiUrl}/recibidas`);
  }

  // GET /compras: historial del usuario
  historial(): Observable<CompraHistorial[]> {
    return this.http.get<CompraHistorial[]>(this.apiUrl);
  }
}