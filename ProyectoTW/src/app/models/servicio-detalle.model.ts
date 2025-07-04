export interface ServicioDetalle {
  detalle_id: number;
  servicio_id: number;
  servicio_descripcion: string;
  cliente_id: number;
  cliente_nombre: string;
  repuesto_id: number;
  repuesto: string;
  cantidad: number;
  factura_id: number | null;
}
