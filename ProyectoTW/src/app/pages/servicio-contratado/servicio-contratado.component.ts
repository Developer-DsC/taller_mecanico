import { Component } from '@angular/core';
import { ServicioDetalleService } from '../../services/servicio-detalle.service';
import { FacturaService } from '../../services/factura.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-servicio-contratado',
  templateUrl: './servicio-contratado.component.html',
  styleUrls: ['./servicio-contratado.component.css'],
})
export class ServicioContratadoComponent {
  servicio: any[] = [];
  factura: any[] | null = null;
  errorMessage: string | null = null;

  constructor(
    private servicioDetalleService: ServicioDetalleService,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioDetalleService.getServicioDetalle().subscribe({
      next: (data) => (this.servicio = data),
      error: (err) => console.error('Error al obtener los servicios:', err),
    });
  }

  previsualizar(item: any): void {
    if (!item.detalle_id) {
      this.errorMessage = 'Detalle ID no definido';
      this.factura = null;
      return;
    }

    this.facturaService.getFacturaByDetalleId(item.detalle_id).subscribe({
      next: (resp) => {
        if (resp.ok && resp.factura && resp.factura.length > 0) {
          this.factura = resp.factura;
          this.errorMessage = null;
          console.log('Factura recibida:', this.factura);

          // Crear contenido HTML para la factura
          if (!this.factura) {
            // Aquí factura es null, salimos o manejamos error
            return;
          }

          const facturaInfo = this.factura[0];
          let contenidoTabla = '';
          this.factura.forEach((detalle) => {
            const descripcion = detalle.servicio || detalle.repuesto || 'N/A';
            const cantidad = detalle.cantidad;
            const precioUnitario = Number(detalle.precio_unitario).toFixed(2);
            const subtotal = Number(detalle.subtotal).toFixed(2);

            contenidoTabla += `
            <tr>
              <td>${descripcion}</td>
              <td>${cantidad}</td>
              <td>$${precioUnitario}</td>
              <td>$${subtotal}</td>
            </tr>`;
          });

          const subtotal = Number(facturaInfo.subtotal).toFixed(2);
          const iva = Number(facturaInfo.iva).toFixed(2);
          const total = Number(facturaInfo.total).toFixed(2);

          const html = `
          <html>
          <head>
            <title>Factura ${facturaInfo.numero_factura}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            </style>
          </head>
          <body>
            <h2>Factura: ${facturaInfo.numero_factura}</h2>
            <p><strong>Cliente:</strong> ${facturaInfo.cliente_nombre}</p>
            <p><strong>Fecha emisión:</strong> ${new Date(
              facturaInfo.fecha_emision
            ).toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${contenidoTabla}
              </tbody>
            </table>
            <p><strong>Subtotal:</strong> $${subtotal}</p>
            <p><strong>IVA (12%):</strong> $${iva}</p>
            <p><strong>Total:</strong> $${total}</p>
          </body>
          </html>
        `;

          // Abrir nueva pestaña y escribir HTML
          const ventana = window.open('', '_blank');
          if (ventana) {
            ventana.document.write(html);
            ventana.document.close();
          } else {
            alert('Por favor permite abrir nuevas ventanas en tu navegador.');
          }
        } else {
          this.errorMessage = resp.message || 'No se pudo obtener la factura';
          this.factura = null;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al comunicarse con el servidor';
        this.factura = null;
        console.error(err);
      },
    });
  }

  descargarFactura(): void {
    if (!this.factura || this.factura.length === 0) {
      alert('No hay factura para descargar');
      return;
    }

    const doc = new jsPDF();

    const facturaInfo = this.factura[0];
    const rows = this.factura.map((d) => [
      d.servicio || 'N/A',
      d.cantidad,
      `$${Number(d.precio_unitario).toFixed(2)}`,
      `$${Number(d.subtotal).toFixed(2)}`,
    ]);

    // Encabezado
    doc.setFontSize(16);
    doc.text(`Factura: ${facturaInfo.numero_factura}`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Cliente: ${facturaInfo.cliente_nombre}`, 14, 25);
    doc.text(
      `Fecha: ${new Date(facturaInfo.fecha_emision).toLocaleString()}`,
      14,
      32
    );

    // Tabla
    autoTable(doc, {
      head: [['Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal']],
      body: rows,
      startY: 40,
    });

    // Totales
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(
      `Subtotal: $${Number(facturaInfo.subtotal).toFixed(2)}`,
      14,
      finalY
    );
    doc.text(
      `IVA (12%): $${Number(facturaInfo.iva).toFixed(2)}`,
      14,
      finalY + 7
    );
    doc.text(
      `Total: $${Number(facturaInfo.total).toFixed(2)}`,
      14,
      finalY + 14
    );

    // Guardar PDF
    const nombreArchivo = `Factura_${facturaInfo.cliente_nombre.replace(
      /\s+/g,
      '_'
    )}_${facturaInfo.numero_factura}.pdf`;
    doc.save(nombreArchivo);
  }
}
