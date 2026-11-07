import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [FormsModule],
  selector: 'app-ayuda-admin',
  styleUrl: './ayuda-admin.css',
  templateUrl: './ayuda-admin.html',
})
export class AyudaAdmin {
  // Lo que completa el usuario (conectado al HTML con ngModel)
  nombre = '';
  correo = '';
  asunto = '';
  mensaje = '';

  // Los motivos de consulta del selector
  asuntos = [
    { valor: 'alojamientos', texto: 'Gestión de alojamientos' },
    { valor: 'usuarios', texto: 'Gestión de usuarios' },
    { valor: 'reservas', texto: 'Problemas con las reservas' },
    { valor: 'pagina', texto: 'Problemas con la página web' },
    { valor: 'acceso', texto: 'Acceso al panel de administrador' },
    { valor: 'otro', texto: 'Otro motivo' },
  ];

  // Cambian cuando responde la API, por eso son señales
  enviando = signal(false);
  exito = signal('');
  error = signal('');

  constructor(private contactoService: ContactoService, private auth: AuthService) {
    // El nombre se completa solo con el de la sesión
    this.nombre = this.auth.nombreUsuario();
  }

  // Botón "Enviar formulario": guarda el mensaje en la base (POST /contacto)
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
    const textoAsunto = this.asuntos.find(a => a.valor === this.asunto)?.texto ?? this.asunto;
    const mensajeCompleto = `[${textoAsunto}] ${this.mensaje.trim()}`;

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
        this.exito.set('Formulario enviado correctamente. ¡Gracias por escribirnos!');
        // Se vacía el formulario (el nombre queda)
        this.correo = '';
        this.asunto = '';
        this.mensaje = '';
      },
      error: e => {
        this.enviando.set(false);
        this.error.set(e.error?.error ?? 'No se pudo enviar el formulario. Probá de nuevo.');
      }
    });
  }
}