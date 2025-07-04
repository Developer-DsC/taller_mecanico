import { Component } from '@angular/core';
import { generarHtmlFactura } from '../../helpers/factura-html.helper';
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
  facturasPorDetalleId: { [detalleId: number]: FacturaDetalleItem[] } = {};
  cargandoFacturaId: number | null = null;
  mensaje: string | null = null;

  constructor(
    private servicioDetalleService: ServicioDetalleService,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(): void {
    this.servicioDetalleService.getServicioDetalle().subscribe({
      next: (data: ServicioDetalle[]) => (this.servicio = data),
      error: (err) => console.error('Error al obtener los servicios:', err),
    });
  }

  previsualizar(item: ServicioDetalle): void {
    const detalle_id = item.detalle_id;
    if (!detalle_id) {
      this.mensaje = 'Detalle ID no definido.';
      return;
    }

    this.facturaService.getFacturaByDetalleId(detalle_id).subscribe({
      next: (resp) => {
        if (resp.ok && resp.factura && resp.factura.length > 0) {
          const html = generarHtmlFactura(resp.factura);
          const ventana = window.open('', '_blank');
          if (ventana) {
            ventana.document.write(
              `<!DOCTYPE html><html><head><title>Factura</title></head><body>${html}</body></html>`
            );
            ventana.document.close();
          }
        } else {
          this.mensaje = 'No se pudo obtener la factura.';
        }
      },
      error: () => {
        this.mensaje = 'Error al comunicarse con el servidor.';
      },
    });
  }

  descargarFacturaPorDetalleId(detalle_id: number): void {
    if (!detalle_id) {
      this.mensaje = 'ID inválido.';
      return;
    }

    this.cargandoFacturaId = detalle_id;
    const facturaGuardada = this.facturasPorDetalleId[detalle_id];

    if (facturaGuardada) {
      this.descargarFactura(facturaGuardada);
    } else {
      this.facturaService.getFacturaByDetalleId(detalle_id).subscribe({
        next: async (resp) => {
          this.cargandoFacturaId = null;

          if (resp.ok && resp.factura && resp.factura.length > 0) {
            this.facturasPorDetalleId[detalle_id] = resp.factura;
            this.mensaje = 'Factura generada exitosamente.';
            await this.descargarFactura(resp.factura);
          } else {
            this.mensaje = 'No se encontró factura para este servicio.';
          }
        },
        error: () => {
          this.cargandoFacturaId = null;
          this.mensaje = 'Error al obtener la factura desde el servidor.';
        },
      });
    }
  }

  async descargarFactura(facturaItems: FacturaDetalleItem[]): Promise<void> {
    const html = generarHtmlFactura(facturaItems);
    const html2pdf = (await import('html2pdf.js')).default;
    const facturaContainer = document.createElement('div');
    facturaContainer.innerHTML = html;
    document.body.appendChild(facturaContainer);

    await html2pdf()
      .set({
        margin: 10,
        filename: `Factura_${facturaItems[0].cliente_nombre.replace(/\s+/g, '_')}_${facturaItems[0].numero_factura}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(facturaContainer)
      .save();

    document.body.removeChild(facturaContainer);
  }
}
