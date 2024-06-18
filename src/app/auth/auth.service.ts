import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, interval } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private historyUrl = 'http://localhost:3000/api/user-history';
  private refreshTokenInterval: any; // Intervalo para refrescar token

  constructor(private http: HttpClient) {}

  // Registrar usuario
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // Iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          this.scheduleTokenRefresh(); // Programar refresco de token
        }
      }),
      switchMap((response) => {
        return this.getUserById(response.user.id).pipe(
          tap((user) => {
            if (user) {
              localStorage.setItem('username', user.username);
              localStorage.setItem('tipo', user.tipo);
              localStorage.setItem('createdAt', user.createdAt);
            }
          })
        );
      })
    );
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('tipo');
    localStorage.removeItem('createdAt');
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval); // Limpiar intervalo de refresco
    }
  }

  // Verificar si está logueado
  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener nombre de usuario
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Obtener ID de usuario
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Obtener tipo de usuario
  getTipo(): string | null {
    return localStorage.getItem('tipo');
  }

  // Obtener fecha de creación
  getCreatedAt(): string | null {
    return localStorage.getItem('createdAt');
  }

  // Obtener usuario por ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener historial de usuario
  getUserHistory(userId: string): Observable<any> {
    return this.http.get<any>(`${this.historyUrl}/${userId}`);
  }

  // Refrescar token
  refreshToken(): Observable<any> {
    const token = this.getToken(); // Obtiene el token alamcenado en localStorage
  
    // Si no hay token, lanza un error
    if (!token) {
      return throwError('No token found'); // Retorno un observable a los suscriptores
    }
  
    // Realiza una solicitud POST al endpoint /refresh-token con el token actual
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { token }).pipe(
      // Operador tap maneja la respuesta del servidor, sin modificarla
      tap((response) => {
        // Si la respuesta contiene nuevo token actualiza localStorage token
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Guarda el nuevo token
        }
      }),
      // Maneja errores en caso de que la solicitud falle
      catchError((error: HttpErrorResponse) => {
        console.error('Error refreshing token:', error); // Imprime el error en la consola
        this.logout(); // Cierra la sesión si hay un error (remueve los datos del localStorage)
        return throwError(error); // Retorna un Observable que lanza el error
      })
    );
  }
  

  // Programar refresco de token
  scheduleTokenRefresh(): void {
    this.refreshTokenInterval = setInterval(() => {
      this.refreshToken().subscribe();
    }, 2000 * 1000); // Cada 2000 segundos
  }
}
