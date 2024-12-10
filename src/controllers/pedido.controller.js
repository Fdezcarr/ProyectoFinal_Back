const { selectAllPedidos, insertPedido, selectPedidoById, updatePedidoById, deletePedidoById, selectAllPedidosEstatus, updatePedidoEstadoById } = require('../models/pedido.model');
const { formateoFecha } = require('../utils/helpers');

const getAllPedidos = async (req, res, next) => {
    try {
        const [result] = await selectAllPedidos();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getPedidoById = async (req, res, next) => {
    const { pedidoId } = req.params;
    try {
        const [pedido] = await selectPedidoById(pedidoId);

        if (pedido.length === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.json(pedido[0]);
    } catch (error) {
        next(error);
    }
};

const getAllPedidosEstatus = async (req, res, next) => {
    try {
        const result = await selectAllPedidosEstatus();
        res.json(result);

    } catch (error) {
        console.log(error);
    }
}

const createPedido = async (req, res, next) => {
    try {
        const [result] = await insertPedido(req.body);
        const insertId = result.insertId;

        const [pedido] = await selectPedidoById(insertId);
        res.status(201).json(pedido[0]);
    } catch (error) {
        next(error);
    }
};

const updatePedido = async (req, res, next) => {
    const { pedidoId } = req.params;

    try {
        // Check if the pedido exists
        const [existingPedido] = await selectPedidoById(pedidoId);
        if (!existingPedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        // Format the date if provided
        if (req.body.fecha_salida) {
            req.body.fecha_salida = formateoFecha(req.body.fecha_salida);
        }

        // Update the pedido
        const [updateResult] = await updatePedidoById(pedidoId, req.body);


        // Check if any rows were affected
        if (updateResult.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el pedido" });
        }

        // Fetch the updated pedido
        const [updatedPedido] = await selectPedidoById(pedidoId);
        res.json(updatedPedido);
    } catch (error) {
        console.error('Error updating pedido:', error);
        next(error);
    }
};

const patchPedidoEstado = async (req, res, next) => {
    const { pedidoId } = req.params;

    try {
        const { estado } = req.body;
        if (!estado) {
            return res.status(400).json({ message: "El campo 'estado' es obligatorio" });
        }
        const [existingPedido] = await selectPedidoById(pedidoId);
        if (!existingPedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        
        await updatePedidoEstadoById(pedidoId, {estado})

        const [updatedPedido] = await selectPedidoById(pedidoId);
        res.json(updatedPedido);
    } catch (error) {
        console.error('Error updating pedido estado:', error);
        next(error);
    }
};

const deletePedido = async (req, res, next) => {
    const { pedidoId } = req.params;
    try {
        const [pedido] = await selectPedidoById(pedidoId);

        if (pedido.length === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        await deletePedidoById(pedidoId);
        res.json({ message: "Pedido eliminado correctamente", pedido: pedido[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    getAllPedidosEstatus,
    createPedido,
    updatePedido,
    patchPedidoEstado,
    deletePedido
};
