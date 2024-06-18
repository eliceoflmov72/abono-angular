import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pass } from '../models/pass.model';

@Injectable({
  providedIn: 'root',
})
export class PassCrudService {
  private apiUrl = 'http://localhost:3000/api/passes';

  constructor(private http: HttpClient) {}

  // Obtener todos los abonos
  getPass(): Observable<Pass[]> {
    return this.http.get<Pass[]>(this.apiUrl).pipe(
      map((passes: any[]) =>
        passes.map(pass => ({
          ...pass,
          price: parseFloat(pass.price.$numberDecimal) // Convertir Decimal128 a número
        }))
      )
    );
  }

  // Obtener abono por id
  getPassById(id: string): Observable<Pass> {
    return this.http.get<Pass>(`${this.apiUrl}/${id}`).pipe(
      map((pass: any) => ({
        ...pass,
        price: parseFloat(pass.price.$numberDecimal) // Convertir Decimal128 a número
      }))
    );
  }

  // Crear abono
  createPass(data: Pass): Observable<Pass> {
    return this.http.post<Pass>(this.apiUrl, data).pipe(
      map((pass: any) => ({
        ...pass,
        price: parseFloat(pass.price.$numberDecimal) // Convertir Decimal128 a número
      }))
    );
  }

  // Actualizar abono
  updatePass(id: string, data: Pass): Observable<Pass> {
    return this.http.put<Pass>(`${this.apiUrl}/${id}`, data).pipe(
      map((pass: any) => ({
        ...pass,
        price: parseFloat(pass.price.$numberDecimal) // Convertir Decimal128 a número
      }))
    );
  }

  // Eliminar abono
  deletePass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
