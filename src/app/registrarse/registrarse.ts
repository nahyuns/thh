import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; //lee los campos del formulario

@Component({
  imports: [RouterLink, FormsModule],
  selector: 'app-registrarse',
  styleUrl: './registrarse.css',
  templateUrl: './registrarse.html',
})
export class Registrarse {
  //creo variables, las cuales se inicializaran vacias
  nombre = '';
  apellido = '';
  email = '';
  contrasena = '';
  confirmar = '';

  //lo mismo hago con las de error para guardar los errores en caso de que los hayan
  errorNombre = '';
  errorApellido = '';
  errorEmail = '';
  errorContrasena = '';
  errorConfirmar = '';

  mensajeExito = '';

  registrarUsuario(): void {
    //limpio los mensajes anteriores
    this.errorNombre = '';
    this.errorApellido = '';
    this.errorEmail = '';
    this.errorContrasena = '';
    this.errorConfirmar = '';
    this.mensajeExito = '';

    //valido el nombre que ingresa el usuario
    if (!this.nombre.trim()) {
      this.errorNombre = 'Ingresá tu nombre.';
    }

    //valido el apellido
    if (!this.apellido.trim()) {
      this.errorApellido = 'Ingresá tu apellido.';
    }

    //valido el correo/email
    if (!this.email.trim()) {
      this.errorEmail = 'Ingresá tu correo electrónico.';

      //si no esta vacio, me fijo que tenga el formato correcto
    } else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test (this.email.trim()) ) {
      //el signo ! indica que el formato no es valido
      //compruebo que tenga texto antes del @, tambien despues y un punto en el correo
      this.errorEmail = 'Ingresá un correo válido.';
    }
    
    //valido la contraseña y confirmar contraseña
    if (!this.contrasena.trim()) {
      this.errorContrasena = 'Ingresá tu contraseña.';
    } else if (this.contrasena.length < 8) {
      this.errorContrasena = 'L a contraseña debe tener al menos 8 caracteres.';
    }

    if (!this.confirmar.trim()) {
      this.errorConfirmar = 'Ingresá tu confrimación de contraseña.';
    } else if (this.contrasena !== this.confirmar) {
      //si la contresa que creó no coincide con la que confirmó, se le pide que la vuelva a ingresar correctamente
      this.errorConfirmar = 'Las contraseñas no coinciden.';
    }
    
    //se detiene el proceso si hay errores
    if ( this.errorNombre || this.errorApellido ||this.errorEmail || this.errorContrasena || this.errorConfirmar) {
      return;
    }
    
    //registro de prueba 
    this.mensajeExito = '¡Registro completado correctamente!';

    console.log('Registro de prueba:', {
      nombre: this.nombre.trim(),
      apellido: this.apellido.trim(),
      correo: this.email.trim()
    });

  }

}
