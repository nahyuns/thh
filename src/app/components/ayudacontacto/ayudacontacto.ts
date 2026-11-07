import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-ayudacontacto',
  styleUrl: './ayudacontacto.css',
  templateUrl: './ayudacontacto.html',
})
export class Ayudacontacto {
  // Lo que completa el usuario (conectado al HTML con ngModel)
  nombre = '';
  correo = '';
  asunto = '';
  mensaje = '';

  // Los motivos de consulta del selector
  asuntos = [
    'Consulta sobre un alquiler',
    'Información sobre destinos',
    'Problemas con una reserva',
    'Cambios o cancelaciones',
    'Medios de pago',
    'Problemas con la página web',
    'Otro motivo',
  ];

  // Cambian cuando responde la API, por eso son señales
  enviando = signal(false);
  exito = signal('');
  error = signal('');

  constructor(private contactoService: ContactoService, private auth: AuthService) {
    // Si hay sesión iniciada, el nombre se completa solo (si no, queda vacío)
    this.nombre = this.auth.nombreUsuario();
  }

  // Botón "Enviar": guarda el mensaje en la base (POST /contacto). No hace falta tener sesión.
  enviar(): void {
    this.exito.set('');
    this.error.set('');

    if (!this.nombre.trim() || !this.correo.trim() || !this.asunto || !this.mensaje.trim()) {
      this.error.set('Completá todos los campos.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo.trim())) {
      this.error.set('Ingresá un correo válido.');
      return;
    }

    // La API no tiene un campo "asunto": va al principio del mensaje
    const mensajeCompleto = `[${this.asunto}] ${this.mensaje.trim()}`;

    // La API guarda hasta 500 caracteres
    if (mensajeCompleto.length > 500) {
      this.error.set('El mensaje es demasiado largo. Probá resumirlo un poco.');
      return;
    }

    this.enviando.set(true);

    this.contactoService.enviar({
      nombre: this.nombre.trim(),
      correo: this.correo.trim(),
      mensaje: mensajeCompleto
    }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.exito.set('¡Gracias por escribirnos! Te responderemos lo antes posible.');
        // Se vacía el formulario
        this.correo = '';
        this.asunto = '';
        this.mensaje = '';
      },
      error: e => {
        this.enviando.set(false);
        this.error.set(e.error?.error ?? 'No se pudo enviar la consulta. Probá de nuevo.');
      }
    });
  }
}