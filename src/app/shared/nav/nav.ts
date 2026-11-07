import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../components/services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  menuAbierto: boolean = false;

  // "public" para poder usar auth.estaLogueado() directamente desde el HTML
  constructor(public auth: AuthService) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  // Botón Salir: cierra la sesión (el enlace del HTML lo lleva al inicio)
  salir() {
    this.auth.logout();
    this.cerrarMenu();
  }
}