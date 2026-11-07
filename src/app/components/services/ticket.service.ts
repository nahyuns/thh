import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../ticket/ticket';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = 'http://localhost/thh-api/public/tickets';
  private urlBase = 'http://localhost/thh-api/public/';

  constructor(private http: HttpClient) {}

  // GET /tickets/{id_compra}
  ver(idCompra: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${idCompra}`);
  }

  // POST /tickets/generar/{id_compra}: le pide a la API que cree el PDF
  generar(idCompra: number): Observable<{ mensaje: string; numero_ticket: string; pdf: string }> {
    return this.http.post<{ mensaje: string; numero_ticket: string; pdf: string }>(`${this.apiUrl}/generar/${idCompra}`, {});
  }

  // Dirección completa del PDF a partir de la ruta guardada ("uploads/tickets/TCK-000001.pdf")
  urlArchivo(ruta: string): string {
    return this.urlBase + ruta;
  }
}