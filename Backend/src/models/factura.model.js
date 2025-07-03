const db = require('../config/db.js');

const create = async ({ numero_factura, cliente_id, fecha_emision, subtotal, iva, total, estado }) => {
  const query = {
    text: `
      INSERT INTO factura (numero_factura, cliente_id, fecha_emision, subtotal, iva, total, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
    values: [numero_factura, cliente_id, fecha_emision, subtotal, iva, total, estado]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllFacturas = async () => {
  const query = {
    text: `
      SELECT f.*, c.nombre AS cliente_nombre
      FROM factura f
      JOIN clientes c ON f.cliente_id = c.cliente_id
      ORDER BY f.fecha_emision DESC;
    `
  };
  const { rows } = await db.query(query);
  return rows;
};

const findFacturaById = async (id) => {
  const query = {
    text: `
      SELECT f.*, c.nombre AS cliente_nombre, fd.*, s.descripcion AS servicio, i.nombre AS repuesto
      FROM factura f
      JOIN clientes c ON f.cliente_id = c.cliente_id
      LEFT JOIN factura_detalle fd ON f.factura_id = fd.factura_id
      LEFT JOIN servicios s ON fd.servicio_id = s.servicio_id
      LEFT JOIN inventarios i ON fd.repuesto_id = i.repuesto_id
      WHERE f.factura_id = $1;
    `,
    values: [id]
  };

  const { rows } = await db.query(query);
  return rows;
};

const getNextNumeroFactura = async () => {
  const query = {
    text: `
      SELECT numero_factura 
      FROM factura
      ORDER BY factura_id DESC
      LIMIT 1;
    `
  };
  const { rows } = await db.query(query);
  if (rows.length === 0) return 'FA-00001';

  const lastNum = rows[0].numero_factura; // ej: "FA-00012"

  if (!lastNum || !lastNum.includes('-')) {
    return 'FA-00001';
  }

  const parts = lastNum.split('-');
  const num = parseInt(parts[1], 10);
  if (isNaN(num)) {
    return 'FA-00001';
  }

  const nextNum = num + 1;
  const nextNumStr = nextNum.toString().padStart(5, '0');
  return `FA-${nextNumStr}`;
};


const FacturaModel = {
  create,
  findAllFacturas,
  findFacturaById,
  getNextNumeroFactura,
};

module.exports = FacturaModel;
