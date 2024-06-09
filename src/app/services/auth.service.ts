import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private historyUrl = 'http://localhost:3000/api/user-history';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.user.id); // Asegúrate de almacenar el ID del usuario correctamente
          console.log('Token stored:', response.token);
        }
      }),
      switchMap((response) => {
        return this.getUserById(response.user.id).pipe(
          tap((user) => {
            if (user) {
              localStorage.setItem('username', user.username);
              localStorage.setItem('tipo', user.tipo); // Almacenar el tipo del usuario
              localStorage.setItem('createdAt', user.createdAt); // Almacenar la fecha de creación del usuario
              console.log('Username stored:', user.username);
              console.log('Tipo stored:', user.tipo);
              console.log('CreatedAt stored:', user.createdAt);
            }
          }),
        );
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('tipo');
    localStorage.removeItem('createdAt');
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
}
