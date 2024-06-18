import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup; // Formulario de registro
  submitted = false; // Indicador de envío de formulario
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required], // Campo nombre con validación
      username: ['', Validators.required], // Campo usuario con validación
      email: ['', [Validators.required, Validators.email]], // Campo email con validación
      password: ['', [Validators.required, Validators.minLength(6)]], // Campo contraseña con validación
      profileImage: [''], // Campo imagen de perfil
    });
  }

  get f() {
    return this.registerForm.controls; // Acceso a controles del formulario
  }

  submitForm() {
    this.submitted = true; // Marcar como enviado

    if (this.registerForm.invalid) {
      return; // Si el formulario es inválido, no continuar
    }

    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registro exitoso', response); // Registro exitoso
        this.router.navigate(['/login']); // Redirigir a inicio de sesión
      },
      (error) => {
        this.errorMessage = error.error.message; // Mostrar mensaje de error
        console.error('Error al registrar el usuario', error);
      },
    );
  }
}
