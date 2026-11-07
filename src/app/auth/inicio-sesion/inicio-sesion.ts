import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../app/components/services/auth.service'

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {
  // Lo que escribe el usuario (conectado al HTML con ngModel)
  correo = '';
  contrasena = '';

  // Estas cambian DESPUÉS de que la API responde, por eso son señales
  error = signal('');
  cargando = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  iniciarSesion(): void {
    this.error.set('');

    if (!this.correo.trim() || !this.contrasena) {
      this.error.set('Ingresá tu correo y tu contraseña.');
      return;
    }

    this.cargando.set(true);

    this.auth.login(this.correo.trim(), this.contrasena).subscribe({
      next: () => {
        this.cargando.set(false);
        // Los anfitriones y el admin van directo a su panel; los huéspedes, al inicio
        this.router.navigate([this.auth.puedeAdministrar() ? '/admin' : '/inicio']);
      },
      error: (e) => {
        this.cargando.set(false);
        // Si la API contestó con un mensaje, lo mostramos; si no, uno genérico
        this.error.set(e.error?.error ?? 'No se pudo iniciar sesión. Probá de nuevo.');
      }
    });
  }
}