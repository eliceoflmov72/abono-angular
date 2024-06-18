import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false; // Indica si el token se está refrescando

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken(); // Obtiene el token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Añade el token al header
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true; // Marca que el token se está refrescando
          return this.authService.refreshToken().pipe(
            switchMap((tokenResponse) => {
              this.isRefreshing = false; // Refrescamiento completado
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokenResponse.token}`, // Añade nuevo token al header
                },
              });
              return next.handle(request); // Reenvía la solicitud
            }),
            catchError((err) => {
              this.isRefreshing = false; // Refrescamiento fallido
              this.authService.logout(); // Cierra sesión
              return throwError(err); // Devuelve el error
            })
          );
        }
        return throwError(error); // Devuelve otros errores
      })
    );
  }
}
