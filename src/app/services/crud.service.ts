import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data_crud.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiUrl = 'http://localhost:3000/api/passes'; // Verifica que esta URL es correcta

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl);
  }

  getDataById(id: string): Observable<Data> {
    console.log('Fetching data by ID:', id); // Verificar llamada
    return this.http.get<Data>(`${this.apiUrl}/${id}`);
  }

  createData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.apiUrl, data);
  }

  updateData(id: string, data: Data): Observable<Data> {
    return this.http.put<Data>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
