import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [RouterLink],
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {}
