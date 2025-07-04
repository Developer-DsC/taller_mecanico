const ServiceDetalleModel = require('./../models/servicio-detalle')

const createServiceDetalle = async (req, res) => {
    try {
        const { servicio_id, cliente_id, repuesto_id, cantidad } = req.body;

       

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

const getServicioById = async (req, res) => {
  const { id } = req.params;

  try {
    const servicio = await ServiceDetalleModel.findServicioById(id);

    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json({ data: servicio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener servicio' });
  }
};


const updateFacturaId = async (req, res) => {
  try {
    const { detalle_id } = req.params;
    const { factura_id } = req.body;

    if (!factura_id) {
      return res.status(400).json({ ok: false, msg: 'Factura_id es requerido en el cuerpo' });
    }

    const detalleActualizado = await ServiceDetalleModel.updateFacturaId(detalle_id, factura_id);

    if (!detalleActualizado) {
      return res.status(404).json({ ok: false, msg: 'Detalle no encontrado para actualizar' });
    }

    res.json({ ok: true, msg: 'Factura asignada correctamente', data: detalleActualizado });
  } catch (error) {
    console.error('Error en updateFacturaId:', error);
    res.status(500).json({ ok: false, msg: 'Error al actualizar factura_id' });
  }
};


const ServiceDetalleController = {
    createServiceDetalle,
    listServiceDetalle,
    listServicios,
    getServicioById,
    updateFacturaId
};

module.exports = ServiceDetalleController;