import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario de inicio de sesión
  submitted = false; // Indicador de envío de formulario
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico con validación
      password: ['', [Validators.required, Validators.minLength(6)]], // Campo de contraseña con validación
    });
  }

  get f() {
    return this.loginForm.controls; // Acceso a los controles del formulario
  }

  submitForm() {
    this.submitted = true; // Marcar como enviado

    if (this.loginForm.invalid) {
      return; // Si el formulario es inválido, no continuar
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response); // Inicio de sesión exitoso
        this.router.navigate(['/']); // Redirigir a la página de inicio
      },
      (error) => {
        this.errorMessage = error.error.message; // Mostrar mensaje de error
        console.error('Error al iniciar sesión', error);
      },
    );
  }
}
