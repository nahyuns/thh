import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Montana } from './components/inicio/montana/montana';
import { Ciudad } from './components/inicio/ciudad/ciudad';
import { Playa } from './components/inicio/playa/playa';
import { Bosque } from './components/inicio/bosque/bosque';
import { Ayudacontacto } from './components/ayudacontacto/ayudacontacto';


export const routes: Routes = [
 //muestra el inicio por defecto
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},

    //creamos rutas definidas
    {path: 'inicio', component: Inicio},
    {path: 'montana', component: Montana},
    {path: 'ciudad', component: Ciudad},
    {path: 'playa', component: Playa},
    {path: 'bosque', component: Bosque},
    {path: 'ayudacontacto', component: Ayudacontacto},

    //captura cualquier URL no definida
    {path: '**', redirectTo: 'inicio'},
];