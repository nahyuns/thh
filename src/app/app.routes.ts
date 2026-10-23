
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
import { PublicaTuAlojamiento } from './components/publica-tu-alojamiento/publica-tu-alojamiento';
import { Alojamientos } from './components/alojamientos/alojamientos';

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
  { path: 'publica-tu-alojamiento', component: PublicaTuAlojamiento },
  { path: 'alojamientos', component: Alojamientos },

  // Captura cualquier URL no definida
  { path: '**', redirectTo: 'inicio' },
];


