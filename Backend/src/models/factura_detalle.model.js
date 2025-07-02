const db = require('../config/db.js');

const create = async ({ factura_id, servicio_id, repuesto_id, cantidad, precio_unitario, subtotal }) => {
  const query = {
    text: `
      INSERT INTO factura_detalle (factura_id, servicio_id, repuesto_id, cantidad, precio_unitario, subtotal)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
    values: [factura_id, servicio_id, repuesto_id, cantidad, precio_unitario, subtotal]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllFacturaDetalles = async () => {
  const query = {
    text: `
      SELECT fd.*, s.descripcion AS servicio, i.nombre AS repuesto
      FROM factura_detalle fd
      LEFT JOIN servicios s ON fd.servicio_id = s.servicio_id
      LEFT JOIN inventarios i ON fd.repuesto_id = i.repuesto_id
      ORDER BY fd.factura_detalle_id DESC;
    `
  };

  const { rows } = await db.query(query);
  return rows;
};

const findByFacturaId = async (factura_id) => {
  const query = {
    text: `
      SELECT fd.*, s.descripcion AS servicio, i.nombre AS repuesto
      FROM factura_detalle fd
      LEFT JOIN servicios s ON fd.servicio_id = s.servicio_id
      LEFT JOIN inventarios i ON fd.repuesto_id = i.repuesto_id
      WHERE fd.factura_id = $1;
    `,
    values: [factura_id]
  };

  const { rows } = await db.query(query);
  return rows;
};

const FacturaDetalleModel = {
  create,
  findAllFacturaDetalles,
  findByFacturaId
};

module.exports = FacturaDetalleModel;
