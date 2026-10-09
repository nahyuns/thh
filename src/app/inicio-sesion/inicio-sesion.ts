import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
   standalone: true,
  imports: [],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
  
})
export class InicioSesion {
    InicioSesion(): void {
    console.log('Formulario enviado');
  }
}
