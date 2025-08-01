const db = require('../config/db.js')

const crear = async({nombre, telefono, email, direccion})=>{
    const query = {
        text:
        'CALL insertar_cliente($1, $2, $3)',
        values:[nombre, telefono, direccion]
    }

    const {rows} = await db.query(query)
    return rows[0];
}

9
// Listar todos los clientes
const findAllClientes = async () => {
    const query = {
        text: 'SELECT * FROM public.clientes;', // Llamada a la función almacenada
    };
    const { rows } = await db.query(query); // Ejecutar la llamada a la función
    return rows; // Retornar los resultados
};

const filterClienteId = async (id) => {
    const query = {
        text: 'SELECT * FROM clientes where cliente_id=$1;',
        values: [id]
    };

    const { rows } = await db.query(query);
    return rows[0];  // Retorna el primer resultado (un solo cliente)
};

// Actualizar un inventario
const updateCliente = async (id, { nombre, telefono, direccion }) => {
    const query = {
        text: 'CALL actualizar_cliente($1, $2, $3,$4);', // Llamar al procedimiento almacenado
        values: [id, nombre, telefono, direccion]
    };

    await db.query(query); // Ejecutar la actualización
    return { msg: 'Cliente actualizado correctamente' };
};


// Eliminar un inventario
const deleteCliente = async (id) => {
    const query = {
        text: 'CALL eliminar_cliente($1);', // Llamar al procedimiento almacenado
        values: [id]
    };

    await db.query(query); // Ejecutar la eliminación
    return { msg: 'Cliente eliminado correctamente' };
};

// Filtrar inventarios por nombre
const filterCliente = async (nombre) => {
    const query = {
        text: 'SELECT * FROM filter_cliente_por_nombre($1);',
        values: [nombre]
    };

    const { rows } = await db.query(query);
    return rows;
};


const ClienteModel = {
    crear,
    findAllClientes,
    updateCliente,
    deleteCliente,
    filterCliente,
    filterClienteId
};

module.exports = ClienteModel;