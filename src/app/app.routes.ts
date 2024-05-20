import { Routes } from '@angular/router';

// Importamos los componentes que hemos creado en esta aplicación.
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';

// Importamos las rutas correspondientes
export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Inicio'},
    { path: 'Mapa', component: MapComponent, title: 'Mapa' },
    { path: 'datadisplay', component: DatadisplayComponent, title: 'Información' },

    { path: '**',redirectTo: '', pathMatch: 'full' },
];
