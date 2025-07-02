const FacturaModel = require('./../models/factura.model.js');

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
  createFactura
};

module.exports = FacturaController;
