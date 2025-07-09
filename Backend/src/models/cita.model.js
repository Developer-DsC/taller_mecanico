const db = require('../config/db.js')

// Crear nueva cita
const crear = async ({cliente_id, servicio_id, fecha, hora, estado, observaciones}) => {
  const query = {
    text: `
      INSERT INTO cita (cliente_id, servicio_id, fecha, hora, estado, observaciones)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
    values: [cliente_id, servicio_id, fecha, hora, estado, observaciones],
  };

  const { rows } = await db.query(query);
  return rows[0];
};

// Listar todas las citas
const listar = async () => {
  const query = {
    text: 'SELECT * FROM cita ORDER BY cita_id ASC;',
  };
  const { rows } = await db.query(query);
  return rows;
};

// Obtener cita por ID
const obtenerPorId = async (cita_id) => {
  const query = {
    text: 'SELECT * FROM cita WHERE cita_id = $1',
    values: [cita_id],
  };
  const { rows } = await db.query(query);
  return rows[0]; // Retorna un solo objeto o undefined si no existe
};

// Actualizar cita
const actualizar = async (cita_id, {cliente_id, servicio_id, fecha, hora, estado, observaciones}) => {
  const query = {
    text: `
      UPDATE cita 
      SET cliente_id = $1, servicio_id = $2, fecha = $3, hora = $4, estado = $5, observaciones = $6
      WHERE cita_id = $7
      RETURNING *;
    `,
    values: [cliente_id, servicio_id, fecha, hora, estado, observaciones, cita_id],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

// Eliminar cita
const eliminar = async (cita_id) => {
  const query = {
    text: 'DELETE FROM cita WHERE cita_id = $1 RETURNING *;',
    values: [cita_id],
  };
  const { rows } = await db.query(query);
  return rows[0]; // Retorna la cita eliminada o undefined si no existía
};

const CitaModel = {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
};

module.exports = CitaModel;
