import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { ClienteService } from '../../services/cliente.service'; // Para listar clientes
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-factura-form', 
  templateUrl: './factura-form.component.html',
  styleUrls: ['./factura-form.component.css']
  
})
export class FacturaFormComponent implements OnInit {
  clientes: any[] = [];
  factura = {
    numero_factura: '',
    cliente_id: null,
    fecha_emision: new Date().toISOString().substring(0, 10),
    detalles: [] as any[], // { servicio_id?, repuesto_id?, cantidad, precio_unitario, subtotal }
  };
  ivaPorcentaje = 0.12;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
  this.clienteService.getCliente().subscribe({
    next: (res: any) => this.clientes = res,
    error: (e: any) => console.error(e)
  });
}


  agregarDetalle() {
    this.factura.detalles.push({ servicio_id: null, repuesto_id: null, cantidad: 1, precio_unitario: 0, subtotal: 0 });
  }

  eliminarDetalle(index: number) {
    this.factura.detalles.splice(index, 1);
  }

  calcularSubtotal(detalle: any) {
    detalle.subtotal = detalle.cantidad * detalle.precio_unitario;
    this.actualizarTotales();
  }

  get subtotal(): number {
    return this.factura.detalles.reduce((sum, d) => sum + d.subtotal, 0);
  }

  get iva(): number {
    return this.subtotal * this.ivaPorcentaje;
  }

  get total(): number {
    return this.subtotal + this.iva;
  }

  actualizarTotales() {
    // Para recalcular valores si es necesario
  }

  guardarFactura() {
    const payload = {
      numero_factura: this.factura.numero_factura,
      cliente_id: this.factura.cliente_id,
      fecha_emision: this.factura.fecha_emision,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total,
      estado: 'Emitida',
      detalles: this.factura.detalles,
    };

    this.facturaService.createFacturaConDetalles(payload).subscribe({
      next: (res) => {
        alert('Factura creada correctamente');
        // Aquí limpiar formulario o redirigir
      },
      error: (e) => {
        console.error(e);
        alert('Error al crear factura');
      }
    });
  }

  generarPDF() {
    const doc = new jsPDF();

    doc.text(`Factura N°: ${this.factura.numero_factura}`, 10, 10);
    doc.text(`Fecha: ${this.factura.fecha_emision}`, 10, 20);
    const cliente = this.clientes.find(c => c.cliente_id === this.factura.cliente_id);
    doc.text(`Cliente: ${cliente?.nombre || ''}`, 10, 30);

    const columnas = ['Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal'];
    const filas = this.factura.detalles.map(d => {
      const descripcion = d.servicio_id ? `Servicio ID: ${d.servicio_id}` : `Repuesto ID: ${d.repuesto_id}`;
      return [descripcion, d.cantidad, d.precio_unitario.toFixed(2), d.subtotal.toFixed(2)];
    });

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      startY: 40,
    });
const finalY = (doc as any).lastAutoTable?.finalY || 40;

doc.text(`Subtotal: $${this.subtotal.toFixed(2)}`, 10, finalY + 10);
doc.text(`IVA (12%): $${this.iva.toFixed(2)}`, 10, finalY + 20);
doc.text(`Total: $${this.total.toFixed(2)}`, 10, finalY + 30);

    doc.save(`Factura_${this.factura.numero_factura}.pdf`);
  }
}
