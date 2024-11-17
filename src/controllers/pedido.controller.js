// src/controllers/pedidosController.js
const { selectAllPedidos, insertPedido, selectPedidoById, updatePedidoById, deletePedidoById } = require('../models/pedido.model');

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
    const { origen, destino, matricula_camion, estado } = req.body;
    try {
        const [existingPedido] = await selectPedidoById(pedidoId);

        if (existingPedido.length === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        const updatedFields = {
            origen,
            destino,
            matricula_camion,
            estado
        };

        await updatePedidoById(pedidoId, updatedFields);
        const [updatedPedido] = await selectPedidoById(pedidoId);
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
    createPedido,
    updatePedido,
    deletePedido
};
