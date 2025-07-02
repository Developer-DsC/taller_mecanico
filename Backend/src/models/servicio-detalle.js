const db = require('../config/db.js')

const create = async({servicio_id, cliente_id, repuesto_id, cantidad})=>{
   
 try {
    const query = {
        text:
        'CALL insertar_Servicio_Detalle($1, $2, $3, $4)',
        values:[servicio_id, cliente_id, repuesto_id, cantidad]
    }
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error en PostgreSQL:', error);

    // Verifica si el error viene del trigger
    if (error.code === 'P0001') {
        throw { status: 400, message: error.message }; // Error controlado
    }

    throw { status: 500, message: 'Error en el servidor' }; // Error genérico

  }
  
}
const findAllServicios = async () => {
    const query = {
        text: 'SELECT * FROM servicios;', // Llamada a la función almacenada
    };
    const { rows } = await db.query(query); // Ejecutar la llamada a la función
    return rows; // Retornar los resultados
};
const findViewServiceDetalle = async () => {
    const query = {
        text: 'SELECT * FROM vista_servicio_detalle ORDER BY detalle_id ASC ;', 
    };
    const { rows } = await db.query(query); 
    return rows; // Retornar los resultados
};

const ServiceDetalleModel = {
    create,
    findViewServiceDetalle,
    findAllServicios
};

module.exports = ServiceDetalleModel;