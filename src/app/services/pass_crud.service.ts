import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pass } from './pass.model';

@Injectable({
  providedIn: 'root',
})
export class PassCrudService {
  private apiUrl = 'http://localhost:3000/api/passes';

  constructor(private http: HttpClient) {}

  getPass(): Observable<Pass[]> {
    return this.http.get<Pass[]>(this.apiUrl);
  }

  getPassById(id: string): Observable<Pass> {
    return this.http.get<Pass>(`${this.apiUrl}/${id}`);
  }

  createPass(data: Pass): Observable<Pass> {
    return this.http.post<Pass>(this.apiUrl, data);
  }

  updatePass(id: string, data: Pass): Observable<Pass> {
    return this.http.put<Pass>(`${this.apiUrl}/${id}`, data);
  }

  deletePass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
