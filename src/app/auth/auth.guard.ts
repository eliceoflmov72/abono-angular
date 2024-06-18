import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const canActivate: CanActivateFn = (
  // Exportaciones para que se puedan usar
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> => {
  const authService = inject(AuthService); // Inyectar servicio de autenticación
  const router = inject(Router); // Inyectar router

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true; // Si está logueado, permitir acceso
      } else {
        router.navigate(['/auth/login']); // Redirigir a login si no está logueado
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth/login']); // En caso de error, redirigir a login
      return of(false);
    }),
  );
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Observable<boolean> => {
  const authService = inject(AuthService); // Inyectar servicio de autenticación
  const router = inject(Router); // Inyectar router

  return authService.isLoggedIn().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true; // Si está logueado, permitir acceso a hijo
      } else {
        router.navigate(['/auth/login']); // Redirigir a login si no está logueado
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth/login']); // En caso de error, redirigir a login
      return of(false);
    }),
  );
};
