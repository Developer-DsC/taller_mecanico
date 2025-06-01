import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ServicioDetalleService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getServicioDetalle(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/servicio-detalles`).pipe(
      map((response) => response.data) // Extrae el arreglo "data" de la respuesta
    );
  }

  insertarServicioDetalle(servicioDetalle: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/servicio-detalle`, servicioDetalle);
  }

  getServicioDetalleAll(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/servicios`).pipe(
      map((response) => response.data) // Extrae el arreglo "data" de la respuesta
    );
  }
  
}
