import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string | null = ''; // Nombre de usuario
  isUserAdmin: boolean = false; // Indica si el usuario es admin
  
  constructor(private authService: AuthService) {} // Inyecta el servicio de autenticación
  
  ngOnInit() {
    this.username = this.authService.getUsername(); // Obtiene el nombre de usuario
    this.isUserAdmin = this.authService.getTipo() === 'admin'; // Verifica si el usuario es admin
  }
  
}
