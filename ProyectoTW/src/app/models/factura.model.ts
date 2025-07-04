export interface FacturaDetalleItem {
  factura_id: number;
  numero_factura: string;
  cliente_id: number;
  fecha_emision: string;
  subtotal: string;
  iva: string;
  total: string;
  estado: string;
  cliente_nombre: string;

  factura_detalle_id: number;
  servicio_id: number | null;
  repuesto_id: number | null;
  cantidad: number;
  precio_unitario: string;

  servicio: string | null;
  repuesto: string | null;
}

