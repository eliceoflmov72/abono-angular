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

  // Obetenre todas las recargas
  getAllRefills(): Observable<Refill[]> {
    return this.http.get<Refill[]>(this.apiUrl);
  }

  // Obtener recarga por id
  getRefillById(id: string): Observable<Refill> {
    return this.http.get<Refill>(`${this.apiUrl}/${id}`);
  }

  // Crear recarga
  createRefill(refill: Refill): Observable<Refill> {
    return this.http.post<Refill>(this.apiUrl, refill);
  }

  // Actualizar recarga
  updateRefill(id: string, refill: Refill): Observable<Refill> {
    return this.http.put<Refill>(`${this.apiUrl}/${id}`, refill);
  }

  // Eliminar recarga
  deleteRefill(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener recargas por abono id
  getRefillsByPassId(passId: string): Observable<Refill[]> {
    return this.http.get<Refill[]>(`${this.apiUrl}/pass/${passId}`);
  }
}
