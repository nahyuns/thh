import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriaBase } from '../categoriaBase';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-playa',
  styleUrl: './playa.css',
  templateUrl: './playa.html',
})
// Toda la lógica (cargar alojamientos, favoritos) está en CategoriaBase.
// Esta página solo indica su categoría.
export class Playa extends CategoriaBase {
  readonly categoria = 'Playa';
}