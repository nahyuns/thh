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
import { Favoritos } from './components/favoritos/favoritos';

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
  { path: 'registrarse', component: Registrarse, },
  { path: 'sobrenosotros', component: Sobrenosotros },
  { path: 'alojamientos', component: Alojamientos },
  {path: 'favoritos', component: Favoritos},

  //captura cualquier URL no definida
  { path: '**', redirectTo: 'inicio' },
];

