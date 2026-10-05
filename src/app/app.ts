import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ayudaycontacto } from './components/ayudaycontacto/ayudaycontacto';

@Component({
  standalone: true,
  imports: [RouterOutlet, Ayudaycontacto],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('thh');
}
