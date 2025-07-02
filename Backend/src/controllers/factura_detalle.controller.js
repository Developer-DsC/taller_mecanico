const FacturaDetalleModel = require('./../models/factura_detalle.model.js');

const createFacturaDetalle = async (req, res) => {
  try {
    const { factura_id, servicio_id, repuesto_id, cantidad, precio_unitario, subtotal } = req.body;

    const detalle = await FacturaDetalleModel.create({
      factura_id,
      servicio_id,
      repuesto_id,
      cantidad,
      precio_unitario,
      subtotal
    });

    return res.status(201).json({ ok: true, msg: 'Detalle de factura creado', data: detalle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: 'Error del servidor' });
  }
};

const listFacturaDetalles = async (req, res) => {
  try {
    const detalles = await FacturaDetalleModel.findAllFacturaDetalles();
    return res.status(200).json({ ok: true, data: detalles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: 'Error del servidor' });
  }
};

const getDetallesByFacturaId = async (req, res) => {
  try {
    const { id } = req.params;
    const detalles = await FacturaDetalleModel.findByFacturaId(+id);
    return res.status(200).json({ ok: true, data: detalles });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: 'Error del servidor' });
  }
};

const FacturaDetalleController = {
  createFacturaDetalle,
  listFacturaDetalles,
  getDetallesByFacturaId
};

module.exports = FacturaDetalleController;
