import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locations`);
  }

  getGenericBus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/generic_bus`);
  }

  getGenericBusById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/generic_bus/${id}`);
  }
}
