import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'abono-proyect'; // Título del proyecto

  showHeaderFooter: boolean = true; // Controla la visibilidad de header y footer

  constructor(private router: Router) {} // Inyecta el servicio Router

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      // nos suscribimos al evento de navegación
      if (event instanceof NavigationEnd) {
        // Valida si el evento si es del tipo
        const hiddenRoutes = ['/auth/register', '/auth/login']; // Rutas ocultas
        this.showHeaderFooter = !hiddenRoutes.some(
          (route) => event.urlAfterRedirects.includes(route), // Oculta header y footer en rutas específicas
        );
      }
    });
  }
}
