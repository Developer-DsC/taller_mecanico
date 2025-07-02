import { Component } from '@angular/core';
import { ServicioDetalleService } from '../../services/servicio-detalle.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-servicio-contratado',
  templateUrl: './servicio-contratado.component.html',
  styleUrls: ['./servicio-contratado.component.css'],  // CORREGIDO
})
export class ServicioContratadoComponent {
  servicio: any[] = [];

  constructor(private servicioDetalleService: ServicioDetalleService) {}

  ngOnInit(): void {
    this.obtenerInventarios();
  }

  trackById(index: number, item: any): any {
    return item.id_detalle || index;
  }

  agregarNuevoServicio(nuevoServicio: any) {
    this.servicio.push(nuevoServicio);
    this.servicio = [...this.servicio];
  }

  obtenerInventarios(): void {
    this.servicioDetalleService.getServicioDetalle().subscribe(
      (data) => {
      
        this.servicio = data;
      },
      (error) => {
        console.error('Error al obtener los inventarios:', error);
      }
    );
  }

 previsualizar(item: any): void {
  const facturaId = item.factura_id;

  if (!facturaId) {
    alert('Este servicio no está vinculado a ninguna factura.');
    return;
  }

  this.servicioDetalleService.getFacturaById(facturaId).subscribe({
    next: (res: any) => {
      const detalles = res.data;

      if (!detalles || detalles.length === 0) {
        alert('Factura no encontrada o vacía.');
        return;
      }

      const factura = detalles[0];

      // Calculamos subtotal real sumando todos los subtotales
      const subtotalCalculado = detalles.reduce((acc: number, d: any) => acc + Number(d.subtotal), 0);

      const ventana = window.open('', '_blank');
      if (!ventana) return;

      let contenido = `
        <html><head><title>Factura</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        </style></head><body>
        <h2>Factura N° ${factura.numero_factura}</h2>
        <p><strong>Cliente:</strong> ${factura.cliente_nombre}</p>
        <p><strong>Fecha:</strong> ${new Date(factura.fecha_emision).toLocaleString()}</p>
        <p><strong>Estado:</strong> ${factura.estado}</p>
        <table><thead><tr>
          <th>Descripción</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th>
        </tr></thead><tbody>
      `;

      detalles.forEach((d: any) => {
        const descripcion = d.servicio || d.repuesto || 'N/A';
        contenido += `
          <tr>
            <td>${descripcion}</td>
            <td>${d.cantidad}</td>
            <td>$${Number(d.precio_unitario).toFixed(2)}</td>
            <td>$${Number(d.subtotal).toFixed(2)}</td>
          </tr>
        `;
      });

      contenido += `
        </tbody></table>
        <p><strong>Subtotal:</strong> $${subtotalCalculado.toFixed(2)}</p>
        <p><strong>IVA:</strong> $${Number(factura.iva).toFixed(2)}</p>
        <p><strong>Total:</strong> $${Number(factura.total).toFixed(2)}</p>
        </body></html>
      `;

      ventana.document.write(contenido);
      ventana.document.close();
    },
    error: (err) => {
      alert('Error al obtener factura');
      console.error(err);
    }
  });
}

descargarPDF(item: any): void {
  const facturaId = item.factura_id;

  if (!facturaId) {
    alert('Este servicio no está vinculado a ninguna factura.');
    return;
  }

  this.servicioDetalleService.getFacturaById(facturaId).subscribe({
    next: (res: any) => {
      const detalles = res.data;
      if (!detalles || detalles.length === 0) {
        alert('Factura no encontrada o vacía.');
        return;
      }

      const factura = detalles[0];

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text(`Factura N° ${factura.numero_factura}`, 10, 15);
      doc.setFontSize(12);
      doc.text(`Cliente: ${factura.cliente_nombre}`, 10, 25);
      doc.text(`Fecha: ${new Date(factura.fecha_emision).toLocaleString()}`, 10, 35);
      doc.text(`Estado: ${factura.estado}`, 10, 45);

      // Calcular subtotal real
      const subtotalCalculado = detalles.reduce((acc: number, d: any) => acc + Number(d.subtotal), 0);

      // Preparar datos para la tabla
      const body = detalles.map((d: any) => [
        d.servicio || d.repuesto || 'N/A',
        d.cantidad,
        `$${Number(d.precio_unitario).toFixed(2)}`,
        `$${Number(d.subtotal).toFixed(2)}`
      ]);

      autoTable(doc, {
        startY: 55,
        head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal']],
        body: body,
      });

      const finalY = (doc as any).lastAutoTable.finalY || 55;
      doc.text(`Subtotal: $${subtotalCalculado.toFixed(2)}`, 10, finalY + 10);
      doc.text(`IVA: $${Number(factura.iva).toFixed(2)}`, 10, finalY + 20);
      doc.text(`Total: $${Number(factura.total).toFixed(2)}`, 10, finalY + 30);

      doc.save(`Factura_${factura.numero_factura}.pdf`);
    },
    error: (err) => {
      alert('Error al obtener factura para descargar');
      console.error(err);
    }
  });
}

}
