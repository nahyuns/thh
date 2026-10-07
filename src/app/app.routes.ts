import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Sobrenosotros } from './components/inicio/sobrenosotros/sobrenosotros/sobrenosotros';

export const routes: Routes = [
 //muestra el inicio por defecto
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},

    //creamos rutas definidas
    {path: 'inicio', component: Inicio},
    {path: 'sobrenosotros', component: Sobrenosotros},

    //captura cualquier URL no definida
    {path: '**', redirectTo: 'inicio'},
];

