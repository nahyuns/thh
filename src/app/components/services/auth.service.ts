import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Datos del usuario que devuelve la API al iniciar sesión
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  tipo: 'huesped' | 'anfitrion' | 'admin';
}

// Datos que pide la API para registrar a alguien
export interface DatosRegistro {
  nombre: string;
  apellido: string;
  correo: string;
  tipo: string;
  contrasena: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost/thh-api/public/usuarios';

  // El usuario logueado vive en una "señal": cuando cambia, Angular actualiza solo
  // todo lo que la use (por ejemplo el menú), sin recargar la página.
  // Arranca leyendo lo que haya guardado, así la sesión sobrevive si se recarga.
  private usuarioActual = signal<Usuario | null>(this.leerUsuarioGuardado());

  constructor(private http: HttpClient) {}

  // POST /usuarios/registro
  registro(datos: DatosRegistro): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  // POST /usuarios/login. Si sale bien, guarda el token y los datos del usuario.
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<{ token: string; usuario: Usuario }>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap(respuesta => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        this.usuarioActual.set(respuesta.usuario); // avisa a la app: ya hay alguien logueado
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.set(null); // avisa a la app: ya no hay sesión
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaLogueado(): boolean {
    return this.usuarioActual() !== null;
  }

  // Los tres tipos de usuario
  esAdmin(): boolean {
    return this.usuarioActual()?.tipo === 'admin';
  }
  esAnfitrion(): boolean {
    return this.usuarioActual()?.tipo === 'anfitrion';
  }
  esHuesped(): boolean {
    return this.usuarioActual()?.tipo === 'huesped';
  }

  // El panel de administración (vista-admin) lo usan los anfitriones y el admin
  puedeAdministrar(): boolean {
    return this.esAdmin() || this.esAnfitrion();
  }

  usuarioId(): number | null {
    return this.usuarioActual()?.id ?? null;
  }

  nombreUsuario(): string {
    return this.usuarioActual()?.nombre ?? '';
  }

  // Lee el usuario guardado en el navegador (o null si no hay o está roto)
  private leerUsuarioGuardado(): Usuario | null {
    try {
      return JSON.parse(localStorage.getItem('usuario') || 'null');
    } catch {
      return null;
    }
  }
}