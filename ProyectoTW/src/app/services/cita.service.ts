import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/api/users/cita';

  constructor(private http: HttpClient) {}

  getCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCitaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearCita(cita: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cita);
  }

  actualizarCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cita);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }
}
