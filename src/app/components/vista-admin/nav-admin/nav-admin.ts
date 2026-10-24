import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-admin',
  styleUrl: './nav-admin.css',
  templateUrl: './nav-admin.html',
})
export class NavAdmin {}
