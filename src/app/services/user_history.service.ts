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

  getUserHistory(userId: string): Observable<UserHistory> {
    return this.http.get<UserHistory>(`${this.apiUrl}/${userId}`);
  }

  addPassToHistory(userId: string, passId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/add`,
      { userId, passId },
      { responseType: 'text' as 'json' },
    );
  }

  removePassFromHistory(userId: string, passId: string): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/remove`,
      { userId, passId },
      { responseType: 'text' as 'json' },
    );
  }

  addCommentToHistory(
    userId: string,
    passId: string,
    comment: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/comment/add`,
      { userId, passId, comment },
      { responseType: 'text' as 'json' },
    );
  }

  getAllCommentsForPass(passId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/${passId}`);
  }
}
