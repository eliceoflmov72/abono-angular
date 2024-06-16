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
  private refreshTokenInterval: any;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id);
          this.scheduleTokenRefresh();
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('tipo');
    localStorage.removeItem('createdAt');
    if (this.refreshTokenInterval) {
      clearInterval(this.refreshTokenInterval);
    }
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return of(!!token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getTipo(): string | null {
    return localStorage.getItem('tipo');
  }

  getCreatedAt(): string | null {
    return localStorage.getItem('createdAt');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserHistory(userId: string): Observable<any> {
    return this.http.get<any>(`${this.historyUrl}/${userId}`);
  }

  refreshToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError('No token found');
    }
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { token }).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error refreshing token:', error);
        this.logout();
        return throwError(error);
      })
    );
  }

  scheduleTokenRefresh(): void {
    this.refreshTokenInterval = setInterval(() => {
      this.refreshToken().subscribe();
    }, 50 * 1000); // 50 segundos
  }
}
