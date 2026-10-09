import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { InicioSesion } from './inicio-sesion/inicio-sesion';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
  },
  {
    path: 'inicio-sesion',
    component: InicioSesion,
  },

  {
    path: 'inicio',
    component: Inicio,
  },
];