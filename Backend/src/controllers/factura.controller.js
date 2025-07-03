const FacturaModel = require('./../models/factura.model.js');
const FacturaDetalleModel = require('../models/factura_detalle.model');
const ServiceDetalleModel = require('../models/servicio-detalle.js');
const InventarioModel = require('../models/inventario.model');

const getOrCreateFacturaByDetalleId = async (req, res) => {
  try {
    const detalle_id = req.params.id;

    console.log('--- INICIO getOrCreateFacturaByDetalleId ---');
    console.log('detalle_id recibido:', detalle_id);

    const detalle = await ServiceDetalleModel.findDetalleById(detalle_id);
    if (!detalle) return res.status(404).json({ ok: false, message: 'Detalle no encontrado' });

    // Si ya tiene factura, retornarla
    if (detalle.factura_id) {
      const facturaExistente = await FacturaModel.findFacturaById(detalle.factura_id);
      return res.json({ ok: true, factura: facturaExistente });
    }

    const numero_factura = await FacturaModel.getNextNumeroFactura();

    // Obtener precios desde la base de datos real
    const servicio = await ServiceDetalleModel.findServicioById(detalle.servicio_id);
    const repuesto = await InventarioModel.filterInventarioId(detalle.repuesto_id);

    const costo_servicio = servicio ? Number(servicio.costo_servicio || 0) : 0;
    const costo_repuesto = repuesto ? Number(repuesto.costo_unitario || 0) : 0;
    const cantidad = Number(detalle.cantidad || 1);

    console.log({ costo_servicio, costo_repuesto, cantidad });

    // Cálculos
    const subtotal_servicio = costo_servicio;
    const subtotal_repuesto = costo_repuesto * cantidad;
    const subtotal = subtotal_servicio + subtotal_repuesto;
    const iva = subtotal * 0.12;
    const total = subtotal + iva;

    // Crear factura
    const factura = await FacturaModel.create({
      numero_factura,
      cliente_id: detalle.cliente_id,
      fecha_emision: new Date(),
      subtotal,
      iva,
      total,
      estado: 'PENDIENTE',
    });

    // Crear detalle de factura (puedes guardar servicio y repuesto en una sola fila o separarlo)
    if (costo_servicio > 0) {
      await FacturaDetalleModel.create({
        factura_id: factura.factura_id,
        servicio_id: detalle.servicio_id,
        repuesto_id: null,
        cantidad: 1,
        precio_unitario: costo_servicio,
        subtotal: costo_servicio,
      });
    }

    if (costo_repuesto > 0) {
      await FacturaDetalleModel.create({
        factura_id: factura.factura_id,
        servicio_id: null,
        repuesto_id: detalle.repuesto_id,
        cantidad,
        precio_unitario: costo_repuesto,
        subtotal: subtotal_repuesto,
      });
    }

    await ServiceDetalleModel.updateFacturaId(detalle_id, factura.factura_id);

    const facturaCompleta = await FacturaModel.findFacturaById(factura.factura_id);
    res.json({ ok: true, factura: facturaCompleta });
    console.log('--- FIN getOrCreateFacturaByDetalleId ---');

  } catch (error) {
    console.error('ERROR en getOrCreateFacturaByDetalleId:', error);
    res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
};


const listFacturas = async (req, res) => {
  try {
    const facturas = await FacturaModel.findAllFacturas();
    return res.status(200).json({ ok: true, data: facturas });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error del servidor" });
  }
};

const getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await FacturaModel.findFacturaById(+id);
    return res.status(200).json({ ok: true, data: factura });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error del servidor" });
  }
};

const createFactura = async (req, res) => {
  try {
    const { numero_factura, cliente_id, fecha_emision, subtotal, iva, total, estado } = req.body;

    const facturaCreada = await FacturaModel.create({
      numero_factura,
      cliente_id,
      fecha_emision,
      subtotal,
      iva,
      total,
      estado
    });

    return res.status(201).json({ ok: true, msg: "Factura creada", data: facturaCreada });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error del servidor" });
  }
};

const FacturaController = {
  listFacturas,
  getFacturaById,
  createFactura,
  getOrCreateFacturaByDetalleId
};

module.exports = FacturaController;
