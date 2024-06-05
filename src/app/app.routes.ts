import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';
import { PassListComponent } from './pages/pass_list/pass_list.component';
import { PassDetailComponent } from './pages/pass_detail/pass_detail.component';
import { RefillListComponent } from './pages/refill_list/refill_list.component';
import { RefillDetailComponent } from './pages/refill_detail/refill_detail.component';
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
    path: 'pass_list',
    component: PassListComponent,
    title: 'Listado',
    canActivate: [canActivate],
  },
  {
    path: 'pass_detail/:id',
    component: PassDetailComponent,
    title: 'Información Detallada',
    canActivate: [canActivate],
  },
  {
    path: 'refill_list',
    component: RefillListComponent,
    title: 'Listado',
    canActivate: [canActivate],
  },
  {
    path: 'refill_detail/:id',
    component: RefillDetailComponent,
    title: 'Información Detallada',
    canActivate: [canActivate],
  },
  { path: 'auth/register', component: RegisterComponent, title: 'Registro' },
  { path: 'auth/login', component: LoginComponent, title: 'Iniciar Sesión' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
