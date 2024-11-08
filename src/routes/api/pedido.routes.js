// src/routes/api/pedido.routes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../../controllers/pedido.controller');

// Ruta para obtener todos los pedidos
router.get('/', pedidoController.getAllPedidos);

// Ruta para obtener un pedido por su ID
router.get('/:pedidoId', pedidoController.getPedidoById);

// Ruta para crear un nuevo pedido
router.post('/', pedidoController.createPedido);

// Ruta para actualizar un pedido por su ID
router.put('/:pedidoId', pedidoController.updatePedido);

// Ruta para eliminar un pedido por su ID
router.delete('/:pedidoId', pedidoController.deletePedido);

module.exports = router;
