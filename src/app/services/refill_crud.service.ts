import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Refill } from '../models/refill.model';

@Injectable({
  providedIn: 'root',
})
export class RefillCrudService {
  private apiUrl = 'http://localhost:3000/api/refills';

  constructor(private http: HttpClient) {}

  getAllRefills(): Observable<Refill[]> {
    return this.http.get<Refill[]>(this.apiUrl);
  }

  getRefillById(id: string): Observable<Refill> {
    return this.http.get<Refill>(`${this.apiUrl}/${id}`);
  }

  createRefill(refill: Refill): Observable<Refill> {
    return this.http.post<Refill>(this.apiUrl, refill);
  }

  updateRefill(id: string, refill: Refill): Observable<Refill> {
    return this.http.put<Refill>(`${this.apiUrl}/${id}`, refill);
  }

  deleteRefill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRefillsByPassId(passId: string): Observable<Refill[]> {
    return this.http.get<Refill[]>(`${this.apiUrl}/pass/${passId}`);
  }
}
