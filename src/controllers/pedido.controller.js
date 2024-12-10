const { selectAllPedidos, insertPedido, selectPedidoById, updatePedidoById, deletePedidoById, selectAllPedidosEstatus } = require('../models/pedido.model');

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
        console.log(result)
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
        const [existingPedido] = await selectPedidoById(pedidoId);


        if (existingPedido.length === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        const [updatedPedido] = await selectPedidoById(pedidoId, req.body);
        res.json(updatedPedido[0]);
    } catch (error) {
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
    deletePedido
};
