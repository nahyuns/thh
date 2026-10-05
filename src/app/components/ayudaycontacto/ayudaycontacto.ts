import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ayudaycontacto',
  imports: [FormsModule],
  templateUrl: './ayudaycontacto.html',
  styleUrl: './ayudaycontacto.css',
})
export class Ayudaycontacto {
  texto = '';
}
