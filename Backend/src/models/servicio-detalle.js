const db = require('../config/db.js');

const create = async ({ servicio_id, cliente_id, repuesto_id, cantidad }) => {
  try {
    const query = {
      text: 'CALL insertar_Servicio_Detalle($1, $2, $3, $4)',
      values: [servicio_id, cliente_id, repuesto_id, cantidad]
    };
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error en PostgreSQL:', error);

    if (error.code === 'P0001') {
      throw { status: 400, message: error.message };
    }

    throw { status: 500, message: 'Error en el servidor' };
  }
};

const findAllServicios = async () => {
  const query = { text: 'SELECT * FROM servicios;' };
  const { rows } = await db.query(query);
  return rows;
};

const findViewServiceDetalle = async () => {
  const query = { text: 'SELECT * FROM vista_servicio_detalle ORDER BY detalle_id ASC;' };
  const { rows } = await db.query(query);
  return rows;
};

const findServicioById = async (id) => {
  const query = {
    text: 'SELECT * FROM servicios WHERE servicio_id = $1;',
    values: [id],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findDetalleById = async (id) => {
  const query = {
    text: 'SELECT * FROM vista_servicio_detalle WHERE detalle_id = $1;',
    values: [id],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateFacturaId = async (detalle_id, factura_id) => {
  const query = {
    text: 'UPDATE servicio_detalle SET factura_id = $1 WHERE detalle_id = $2 RETURNING *;',
    values: [factura_id, detalle_id],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const ServiceDetalleModel = {
  create,
  findViewServiceDetalle,
  findAllServicios,
  findServicioById,
  updateFacturaId,
  findDetalleById // 👈 agregado aquí
};

module.exports = ServiceDetalleModel;
