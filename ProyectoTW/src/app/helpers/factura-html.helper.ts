// src/app/utils/factura-html.util.ts
import { FacturaDetalleItem } from '../models/factura.model';

export function generarHtmlFactura(factura: FacturaDetalleItem[]): string {
  if (!factura || factura.length === 0) return '';

  const facturaInfo = factura[0];
  let contenidoTabla = '';

  factura.forEach((detalle) => {
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

  return `
  <div style="font-family: Roboto, Arial, sans-serif; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-width: 800px; margin: auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;">
      <div style="font-size: 20px; font-weight: bold; color: #343a40;">Taller Mecánico San Gabriel</div>
      <div>Factura Nº: ${facturaInfo.numero_factura}</div>
    </div>

    <div style="margin-bottom: 20px;">
      <p><strong>Cliente:</strong> ${facturaInfo.cliente_nombre}</p>
      <p><strong>Fecha emisión:</strong> ${new Date(
        facturaInfo.fecha_emision
      ).toLocaleString()}</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background-color: #007bff; color: #fff;">
          <th style="border: 1px solid #dee2e6; padding: 10px;">Descripción</th>
          <th style="border: 1px solid #dee2e6; padding: 10px;">Cantidad</th>
          <th style="border: 1px solid #dee2e6; padding: 10px;">Precio Unitario</th>
          <th style="border: 1px solid #dee2e6; padding: 10px;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${contenidoTabla}
      </tbody>
    </table>

    <div style="text-align: right; margin-top: 20px;">
      <p><strong>Subtotal:</strong> $${subtotal}</p>
      <p><strong>IVA (12%):</strong> $${iva}</p>
      <p><strong>Total:</strong> <strong>$${total}</strong></p>
    </div>
  </div>`;
}
