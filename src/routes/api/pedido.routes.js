// src/routes/api/pedido.routes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../../controllers/pedido.controller');
const { checkToken, checkEncargado, checkOperario, checkOperarioOrEncargado } = require('../../utils/middleware');

// Ruta para obtener todos los pedidos (solo encargados)
router.get('/', checkToken, checkEncargado, pedidoController.getAllPedidos);

// Ruta para obtener todos los estatus de los pedidos
router.get('/estados', checkToken, pedidoController.getAllPedidosEstatus);

// Ruta para obtener un pedido por su ID (solo encargados)
router.get('/:pedidoId', checkToken, checkEncargado, pedidoController.getPedidoById);

// Ruta para crear un nuevo pedido (solo operarios)
router.post('/', checkToken, checkOperario, pedidoController.createPedido);

// // Ruta para actualizar un pedido por su ID (solo operarios o encargados)
router.put('/:pedidoId', checkToken, checkOperarioOrEncargado, pedidoController.updatePedido);

// Ruta para eliminar un pedido (solo encargado)
router.delete('/:pedidoId', checkToken, checkEncargado, pedidoController.deletePedido);

module.exports = router;
