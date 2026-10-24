import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { Nav } from './shared/nav/nav';
import { Footer } from './shared/footer/footer';
import { NavAdmin } from './components/vista-admin/nav-admin/nav-admin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, NavAdmin, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //inyectamos router para consultar la URL actual desde app.html
  constructor ( private router: Router) {}
}
