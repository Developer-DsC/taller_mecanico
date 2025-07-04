const ClienteModel = require('./../models/cliente.model.js')

const createCliente = async(req, res) => {
    try {

        const { nombre, telefono, email, direccion } = req.body;

       
        // Enviamos todos los valores esperados por la consulta
        const clienteCreate = ClienteModel.create({
            nombre,
            telefono,
            email,
            direccion
        });

        return res.status(201).json({ ok: true, msg: "Cliente creado", data: clienteCreate });

    } catch (error) {
        if (error.code === 'P0001') {
            // Error lanzado desde PostgreSQL (RAISE EXCEPTION)
            res.status(400).json({ error: error.message });
          } else {
            // Otros errores
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
};

// Listar todos los clientes
const listClientes = async(req, res) => {
    try {
        const clientes = await ClienteModel.findAllClientes();
        return res.status(200).json({ ok: true, data: clientes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

// Listar todos los inventarios
const listClienteId = async(req, res) => {

    try {
        const { id } = req.params;
        const inventarios = await ClienteModel.filterClienteId(+id);
        return res.status(200).json({ ok: true, data: inventarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};
// Actualizar inventario
const updateCliente = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, email, direccion } = req.body;

        const clienteUpdated = await ClienteModel.updateCliente(id, {
            nombre,
            telefono,
            email,
            direccion
        });

        return res.status(200).json({ ok: true, msg: "Cliente actualizado", data: clienteUpdated });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

// Eliminar cliente
const deleteCliente = async(req, res) => {
    try {
        const { id } = req.params;

        const clienteDeleted = await ClienteModel.deleteCliente(id);

        if (!clienteDeleted) {
            return res.status(404).json({ ok: false, msg: "Cliente no encontrado" });
        }

        return res.status(200).json({ ok: true, msg: "Cliente eliminado", data: clienteDeleted });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

// Filtrar inventarios por nombre
const filterClientes = async(req, res) => {
    try {
        const { nombre } = req.query;

        const inventariosFiltered = await InventarioModel.filterInventario(nombre);

        return res.status(200).json({ ok: true, data: inventariosFiltered });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

const ClienteController = {
    createCliente,
    listClientes,
    updateCliente,
    deleteCliente,
    filterClientes,
    listClienteId
};

module.exports = ClienteController;