import { Component } from '@angular/core';
import { generarHtmlFactura } from '../../helpers/factura-html.helper'; // Ajusta ruta si es necesario
import { FacturaDetalleItem } from '../../models/factura.model';
import { ServicioDetalle } from '../../models/servicio-detalle.model';
import { FacturaService } from '../../services/factura.service';
import { ServicioDetalleService } from '../../services/servicio-detalle.service';

@Component({
  selector: 'app-servicio-contratado',
  templateUrl: './servicio-contratado.component.html',
  styleUrls: ['./servicio-contratado.component.css'],
})
export class ServicioContratadoComponent {
  servicio: ServicioDetalle[] = [];
  factura: FacturaDetalleItem[] | null = null;
  errorMessage: string | null = null;
  htmlFactura: string = '';

  constructor(
    private servicioDetalleService: ServicioDetalleService,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioDetalleService.getServicioDetalle().subscribe({
      next: (data:ServicioDetalle[]) => (this.servicio = data),
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

          if (this.factura == null) {
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

          this.htmlFactura = generarHtmlFactura(this.factura);


          const ventana = window.open('', '_blank');
          if (ventana) {
            ventana.document.write(
              `<!DOCTYPE html><html><head><title>Factura</title></head><body>${this.htmlFactura}</body></html>`
            );
            ventana.document.close();
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

  async descargarFactura(): Promise<void> {
    if (!this.factura || this.factura.length === 0 || !this.htmlFactura) {
      alert('No hay factura disponible para descargar');
      return;
    }

    const html2pdf = (await import('html2pdf.js')).default;

    const facturaContainer = document.createElement('div');
    facturaContainer.innerHTML = this.htmlFactura;
    document.body.appendChild(facturaContainer);

    await html2pdf()
      .set({
        margin: 10,
        filename: `Factura_${this.factura[0].cliente_nombre.replace(
          /\s+/g,
          '_'
        )}_${this.factura[0].numero_factura}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(facturaContainer)
      .save();

    document.body.removeChild(facturaContainer);
  }
}
