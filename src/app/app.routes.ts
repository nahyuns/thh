import { Routes } from '@angular/router';
import { Ayudaycontacto } from './components/ayudaycontacto/ayudaycontacto';

export const routes: Routes = [
    {path: '', redirectTo: 'ayudaycontacto'},
    {path: 'ayudaycontacto', component: Ayudaycontacto}
];
