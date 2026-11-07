import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriaBase } from '../categoriaBase';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-montana',
  styleUrl: './montana.css',
  templateUrl: './montana.html',
})
// Toda la lógica (cargar alojamientos, favoritos) está en CategoriaBase.
// Esta página solo indica su categoría.
export class Montana extends CategoriaBase {
  readonly categoria = 'Montaña';
}