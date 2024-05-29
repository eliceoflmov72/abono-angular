import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';
import { ListcomponentComponent } from './pages/listcomponent/listcomponent.component';
import { DetailcomponentComponent } from './pages/detailcomponent/detailcomponent.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio' },
  { path: 'Mapa', component: MapComponent, title: 'Mapa' },
  { path: 'datadisplay', component: DatadisplayComponent, title: 'Información' },
  { path: 'listcomponent', component: ListcomponentComponent, title: 'Listado' },
  { path: 'detailcomponent/:id', component: DetailcomponentComponent, title: 'Información Detallada' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

