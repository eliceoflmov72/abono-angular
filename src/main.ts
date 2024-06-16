import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import {
  withInterceptorsFromDi,
  provideHttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from '../src/app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
    provideHttpClient(withInterceptorsFromDi()), // Configura el cliente HTTP con interceptores
    provideRouter(routes), // Proporciona el enrutador con las rutas definidas
    provideAnimations(), // Proporciona animaciones si son necesarias
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Configura el interceptor de autenticación
  ],
}).catch((err) => console.error(err));
