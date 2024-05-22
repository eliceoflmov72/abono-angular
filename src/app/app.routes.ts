import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio' },
  { path: 'Mapa', component: MapComponent, title: 'Mapa' },
  { path: 'datadisplay', component: DatadisplayComponent, title: 'Información' },
  { path: 'datadisplay/:id', component: DatadisplayComponent, title: 'Información Detallada' }, // Ruta con parámetro dinámico
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
