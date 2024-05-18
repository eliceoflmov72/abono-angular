import { Routes } from '@angular/router';

// Importamos los componentes que hemos creado en esta aplicación.
import { HomeComponent } from './pages/home/home.component';

// Importamos las rutas correspondientes
export const routes: Routes = [
    { path: '**',redirectTo: '', pathMatch: 'full' },
    { path: '', component: HomeComponent, title: 'Inicio'}
];
