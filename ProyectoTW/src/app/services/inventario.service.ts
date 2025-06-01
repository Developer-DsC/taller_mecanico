import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Inventario {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}
@Injectable({
  providedIn: 'root'
})

export class InventarioService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getInventarios(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/inventarios`).pipe(
      map((response) => response.data), // Extrae el arreglo "data" de la respuesta
    );
  }

  insertarRepuesto(repuesto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inventario`, repuesto);
  }

  ListOneRespuesto(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventario/filtrar/${id}`);
  }

  updateRepuesto(id: number,repuesto:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/inventario/${id}`,repuesto);
  }

  deleteRespuestos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventario/${id}`);
  }
}
