import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importamos la configuración de las rutas (paths)
// que se encuentran en el archivo app.routes.ts
import { routes } from './app.routes';

// Esto sirve para conectar a un servidor remoto y obtener datos de una API.
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient()]
};
