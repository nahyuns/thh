import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Montana } from './components/inicio/montana/montana';
import { Ciudad } from './components/inicio/ciudad/ciudad';
import { Playa } from './components/inicio/playa/playa';
import { Bosque } from './components/inicio/bosque/bosque';
import { Ayudacontacto } from './components/ayudacontacto/ayudacontacto';
import { InicioSesion } from './inicio-sesion/inicio-sesion';
import { Registrarse } from './registrarse/registrarse';
import { Sobrenosotros } from './components/inicio/sobrenosotros/sobrenosotros/sobrenosotros';
import { Alojamientos } from './components/alojamientos/alojamientos';
// Importamos las vistas del administrador.
import { InicioAdmin } from './components/vista-admin/inicio-admin/inicio-admin';
import { AlojamientosAdmin } from './components/vista-admin/alojamientos-admin/alojamientos-admin';
import { AyudaAdmin } from './components/vista-admin/ayuda-admin/ayuda-admin';
import { PagosCobrosAdmin } from './components/vista-admin/pagos-cobros-admin/pagos-cobros-admin';
import { PublicaTuAlojamientoAdmin } from './components/vista-admin/publica-tu-alojamiento-admin/publica-tu-alojamiento-admin';
import { ReservasAdmin } from './components/vista-admin/reservas-admin/reservas-admin';

export const routes: Routes = [
  //muestra el inicio por defecto
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  //creamos rutas definidas
  { path: 'inicio', component: Inicio },
  { path: 'montana', component: Montana },
  { path: 'ciudad', component: Ciudad },
  { path: 'playa', component: Playa },
  { path: 'bosque', component: Bosque },
  { path: 'ayudacontacto', component: Ayudacontacto },
  { path: 'inicio-sesion', component: InicioSesion },
  { path: 'registrarse',  component: Registrarse, },
  {path: 'sobrenosotros', component: Sobrenosotros},
  {path: 'alojamientos', component: Alojamientos},
  // Rutas independientes del administrador.
  // Cada dirección carga directamente su componente, sin rutas hijas.
  { path: 'admin', component: InicioAdmin },
  { path: 'admin/alojamientos', component: AlojamientosAdmin },
  { path: 'admin/reservas', component: ReservasAdmin },
  { path: 'admin/pagos-cobros', component: PagosCobrosAdmin },
  { path: 'admin/ayuda', component: AyudaAdmin },
  { path: 'admin/publica-tu-alojamiento', component: PublicaTuAlojamientoAdmin },
  
  //captura cualquier URL no definida
  { path: '**', redirectTo: 'inicio' },
];

