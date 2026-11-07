import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Montana } from './components/inicio/montana/montana';
import { Ciudad } from './components/inicio/ciudad/ciudad';
import { Playa } from './components/inicio/playa/playa';
import { Bosque } from './components/inicio/bosque/bosque';
import { Ayudacontacto } from './components/ayudacontacto/ayudacontacto';
import { InicioSesion } from './auth/inicio-sesion/inicio-sesion';
import { Registrarse } from './auth/registrarse/registrarse';
import { Sobrenosotros } from './components/inicio/sobrenosotros/sobrenosotros/sobrenosotros';
import { Alojamientos } from './components/alojamientos/alojamientos';
import { Favoritos } from './components/favoritos/favoritos';
import { DetalleAlojamiento } from './components/detallealojamiento/detallealojamiento';
// Importamos las vistas del administrador.
import { InicioAdmin } from './components/vista-admin/inicio-admin/inicio-admin';
import { AlojamientosAdmin } from './components/vista-admin/alojamientos-admin/alojamientos-admin';
import { AyudaAdmin } from './components/vista-admin/ayuda-admin/ayuda-admin';
import { PagosCobrosAdmin } from './components/vista-admin/pagos-cobros-admin/pagos-cobros-admin';
import { PublicaTuAlojamientoAdmin } from './components/vista-admin/publica-tu-alojamiento-admin/publica-tu-alojamiento-admin';
import { ReservasAdmin } from './components/vista-admin/reservas-admin/reservas-admin';
// Guard: bloquea las rutas del panel a quien no sea anfitrión o admin.
import { adminGuard } from './guard/admin.guard';
import { authGuard } from './auth/auth.guard';
// Páginas de la reserva: carrito, resumen, historial y ticket.
import { Carrito } from './carrito/carrito';
import { ResumenCompra } from './resumencompra/resumencompra';
import { MisReservas } from './misreservas/misreservas';
import { TicketReserva } from './ticket/ticket';

export const routes: Routes = [
  // Muestra el inicio por defecto
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // Rutas principales
  { path: 'inicio', component: Inicio },
  { path: 'montana', component: Montana },
  { path: 'ciudad', component: Ciudad },
  { path: 'playa', component: Playa },
  { path: 'bosque', component: Bosque },
  { path: 'ayudacontacto', component: Ayudacontacto },
  { path: 'inicio-sesion', component: InicioSesion },
  { path: 'registrarse', component: Registrarse },
  { path: 'sobrenosotros', component: Sobrenosotros },
  { path: 'alojamientos', component: Alojamientos },
  { path: 'favoritos', component: Favoritos },
  // La página de publicar ahora vive dentro del panel (admin/publica-tu-alojamiento).
  // Esta redirección hace que los enlaces viejos sigan funcionando.
  { path: 'publica-tu-alojamiento', redirectTo: 'admin/publica-tu-alojamiento', pathMatch: 'full' },
  { path: 'detallealojamiento/:id', component: DetalleAlojamiento },

  // Rutas del panel (anfitrión / admin).
  // Cada dirección carga directamente su componente, sin rutas hijas.
  // canActivate: [adminGuard] las protege.
  { path: 'admin', component: InicioAdmin, canActivate: [adminGuard] },
  { path: 'admin/alojamientos', component: AlojamientosAdmin, canActivate: [adminGuard] },
  { path: 'admin/reservas', component: ReservasAdmin, canActivate: [adminGuard] },
  { path: 'admin/pagos-cobros', component: PagosCobrosAdmin, canActivate: [adminGuard] },
  { path: 'admin/ayuda', component: AyudaAdmin, canActivate: [adminGuard] },
  { path: 'admin/publica-tu-alojamiento', component: PublicaTuAlojamientoAdmin, canActivate: [adminGuard] },
  { path: 'admin/alojamientos/:id/editar', component: PublicaTuAlojamientoAdmin, canActivate: [adminGuard] },

  // Reserva (hace falta tener la sesión iniciada: authGuard)
  { path: 'carrito', component: Carrito, canActivate: [authGuard] },
  { path: 'compra', component: ResumenCompra, canActivate: [authGuard] },
  { path: 'mis-reservas', component: MisReservas, canActivate: [authGuard] },
  { path: 'ticket/:id', component: TicketReserva, canActivate: [authGuard] },

  // Captura cualquier URL no definida
  { path: '**', redirectTo: 'inicio' },
];