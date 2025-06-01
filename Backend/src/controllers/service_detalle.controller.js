const ServiceDetalleModel = require('./../models/servicio-detalle')

const createServiceDetalle = async (req, res) => {
    try {
        const { servicio_id, cliente_id, repuesto_id, cantidad } = req.body;

        console.log("Datos recibidos:", req.body);

        const serviceCreate = await ServiceDetalleModel.create({
            servicio_id,
            cliente_id,
            repuesto_id,
            cantidad
        });

        return res.status(201).json({ 
            ok: true, 
            msg: "Servicio agregado correctamente", 
            data: serviceCreate 
        });

    } catch (error) {
        console.error("Error en createServiceDetalle:", error);

        // Verificar si el error viene del trigger en PostgreSQL
        if (error.code === 'P0001') {
            if (error.message.includes('El repuesto no existe en el inventario')) {
                return res.status(400).json({ ok: false, msg: 'El repuesto no existe en el inventario.' });
            } else if (error.message.includes('Cantidad no disponible en el stock')) {
                return res.status(400).json({ ok: false, msg: 'No hay suficiente cantidad en stock.' });
            }
        }

        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};



const listServiceDetalle = async(req, res) => {
    try {
        const serviceDetalle = await ServiceDetalleModel.findViewServiceDetalle();
        return res.status(200).json({ ok: true, data: serviceDetalle });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

const listServicios = async(req, res) => {
    try {
        const servicios = await ServiceDetalleModel.findAllServicios();
        return res.status(200).json({ ok: true, data: servicios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error del servidor" });
    }
};

const ServiceDetalleController = {
    createServiceDetalle,
    listServiceDetalle,
    listServicios  
};

module.exports = ServiceDetalleController;