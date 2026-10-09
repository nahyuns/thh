import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import {Playa} from './components/inicio/playa/playa'
import {Bosque} from './components/inicio/bosque/bosque'


export const routes: Routes = [
 //muestra el inicio por defecto
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},

    //creamos rutas definidas
    {path: 'inicio', component: Inicio},
    {path: 'playa', component: Playa},
    {path: 'bosque', component: Bosque},
    //captura cualquier URL no definida
    {path: '**', redirectTo: 'inicio'},
];