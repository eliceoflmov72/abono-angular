import { Routes } from '@angular/router';


// Importamos los componentes que hemos creado en esta aplicación.

// Importamos las rutas correspondientes
export const routes: Routes = [
    { path: '**',redirectTo: '', pathMatch: 'full' }
];
