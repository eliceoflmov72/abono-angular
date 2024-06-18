import { Injectable } from '@angular/core';
import {
  CanActivate, // Interfaz indica si ruta activada
  ActivatedRouteSnapshot, // Info ruta momento específico
  RouterStateSnapshot, // Estado enrutador momento específico
  Router, // Servicio navegación enrutador
} from '@angular/router';
import { Observable } from 'rxjs'; // Programación reactiva
import { AuthService } from './auth.service'; // Servicio autenticación

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService, // Inyecta servicio autenticación
    private router: Router, // Inyecta servicio enrutador
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, // Ruta actual
    state: RouterStateSnapshot, // Estado enrutador
  ): Observable<boolean> | Promise<boolean> | boolean {
    const tipo = this.authService.getTipo(); // Tipo usuario
    if (
      tipo === 'admin' || // Si admin, permite
      (tipo === 'default' && !route.data['tipo']?.includes('admin')) // Si default y no admin, permite
    ) {
      return true;
    }
    this.router.navigate(['/']); // Si no, redirige inicio
    return false; // No permite acceso
  }
}
