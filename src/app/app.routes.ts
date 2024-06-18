import { Routes } from '@angular/router';
import { canActivate } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { DatadisplayComponent } from './pages/datadisplay/datadisplay.component';
import { DatadisplayDetailComponent } from './pages/datadisplay_detail/datadisplay_detail.component';
import { PassListComponent } from './pages/pass_list/pass_list.component';
import { PassDetailComponent } from './pages/pass_detail/pass_detail.component';
import { RefillListComponent } from './pages/refill_list/refill_list.component';
import { RefillDetailComponent } from './pages/refill_detail/refill_detail.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { TermsPoliticsComponent } from './pages/terms-politics/terms-politics.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'contact-form',
    component: ContactFormComponent,
    title: 'Contactar',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'map',
    component: MapComponent,
    title: 'Mapa',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'datadisplay',
    component: DatadisplayComponent,
    title: 'Información',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'datadisplay/:id',
    component: DatadisplayDetailComponent,
    title: 'Información detallada',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'pass_list',
    component: PassListComponent,
    title: 'Listado',
    canActivate: [canActivate, RoleGuard], // Guard de la autenticación y roles
    data: { tipo: ['admin'] },
  },
  {
    path: 'pass_detail/:id',
    component: PassDetailComponent,
    title: 'Información detallada',
    canActivate: [canActivate, RoleGuard], // Guard de la autenticación y roles
    data: { tipo: ['admin'] },
  },
  {
    path: 'refill_list',
    component: RefillListComponent,
    title: 'Listado',
    canActivate: [canActivate, RoleGuard], // Guard de la autenticación y roles
    data: { tipo: ['admin'] },
  },
  {
    path: 'refill_detail/:id',
    component: RefillDetailComponent,
    title: 'Información detallada',
    canActivate: [canActivate, RoleGuard], // Guard de la autenticación y roles
    data: { tipo: ['admin'] },
  },

  {
    path: 'profile',
    component: ProfileComponent,
    title: 'Perfil',
    canActivate: [canActivate], // Guard de la atenticación
  },
  {
    path: 'terms-politics',
    component: TermsPoliticsComponent,
    title: 'Términos y Políticas',
    canActivate: [canActivate], // Guard de la atenticación
  },
  { path: 'auth/register', component: RegisterComponent, title: 'Registro' },
  { path: 'auth/login', component: LoginComponent, title: 'Iniciar Sesión' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
