import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string | null = '';
  isUserAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.isUserAdmin = this.authService.getTipo() === 'admin';
  }
}
