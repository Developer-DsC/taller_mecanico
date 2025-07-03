// factura.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:3000/api/users'; // Ajusta si necesitas

  constructor(private http: HttpClient) {}

  // Crear factura con detalles
  createFacturaConDetalles(facturaPayload: any) {
    return this.http.post(`${this.apiUrl}/facturas`, facturaPayload);
  }

  // Listar todas las facturas
  getFacturas() {
    return this.http.get(`${this.apiUrl}/facturas`);
  }

  // Obtener factura con detalle por ID
  getFacturaById(id: number) {
    return this.http.get(`${this.apiUrl}/factura/${id}`);
  }
 
  getFacturaByDetalleId(detalleId: number) {
  return this.http.get<any>(`${this.apiUrl}/factura/filtrar/${detalleId}`);
}


}
