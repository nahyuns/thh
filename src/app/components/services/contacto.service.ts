import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private apiUrl = 'http://localhost/thh-api/public/contacto';

  constructor(private http: HttpClient) {}

  // POST /contacto: guarda un mensaje de ayuda (no hace falta tener sesión)
  enviar(datos: { nombre: string; correo: string; mensaje: string }): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.apiUrl, datos);
  }

  // GET /contacto: todos los mensajes (solo admin)
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}