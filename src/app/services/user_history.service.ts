import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserHistory, Comment } from '../models/user_history.model';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private apiUrl = 'http://localhost:3000/api/history';

  constructor(private http: HttpClient) {}

  // Obtener historial de usuario
  getUserHistory(userId: string): Observable<UserHistory> {
    return this.http.get<UserHistory>(`${this.apiUrl}/${userId}`);
  }

  // Añadir un abono favorito al historial de usuario
  addPassToHistory(userId: string, passId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/add`,
      { userId, passId },
      { responseType: 'text' as 'json' },
    );
  }

  // Eliminar un abono favorito del historial de usuario
  removePassFromHistory(userId: string, passId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/remove`,
      { userId, passId },
      { responseType: 'text' as 'json' },
    );
  }

  // Anadir un comentario al historial de usuario
  addCommentToHistory(
    userId: string,
    passId: string,
    comment: string,
    createdBy: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/comment/add`,
      { userId, passId, comment, createdBy },
      { responseType: 'text' as 'json' },
    );
  }

  // Obtener todos los comentarios para un solo abono
  getAllCommentsForPass(passId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${passId}`);
  }
}
