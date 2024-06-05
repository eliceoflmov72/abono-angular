import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';
import { ListcomponentComponent } from './pages/listcomponent/listcomponent.component';
import { DetailcomponentComponent } from './pages/detailcomponent/detailcomponent.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { canActivate } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
    canActivate: [canActivate],
  },
  {
    path: 'map',
    component: MapComponent,
    title: 'Mapa',
    canActivate: [canActivate],
  },
  {
    path: 'datadisplay',
    component: DatadisplayComponent,
    title: 'Información',
    canActivate: [canActivate],
  },
  {
    path: 'listcomponent',
    component: ListcomponentComponent,
    title: 'Listado',
    canActivate: [canActivate],
  },
  {
    path: 'detailcomponent/:id',
    component: DetailcomponentComponent,
    title: 'Información Detallada',
    canActivate: [canActivate],
  },
  { path: 'auth/register', component: RegisterComponent, title: 'Registro' },
  { path: 'auth/login', component: LoginComponent, title: 'Iniciar Sesión' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
