// src/routes/api/pedido.routes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../../controllers/pedido.controller');
const { checkToken, checkAdmin, checkRol } = require('../../utils/middleware');

// Ruta para obtener todos los pedidos (autenticación requerida)
router.get('/', checkToken, pedidoController.getAllPedidos);

// Ruta para obtener un pedido por su ID (autenticación requerida)
router.get('/:pedidoId', checkToken, pedidoController.getPedidoById);

// Ruta para crear un nuevo pedido (solo usuarios con rol "jefe")
router.post('/', checkToken, checkRol('jefe'), pedidoController.createPedido);

// Ruta para actualizar un pedido por su ID (solo usuarios con rol "jefe")
router.put('/:pedidoId', checkToken, checkRol('jefe'), pedidoController.updatePedido);

// Ruta para eliminar un pedido por su ID (solo administradores)
router.delete('/:pedidoId', checkToken, checkAdmin, pedidoController.deletePedido);

module.exports = router;
