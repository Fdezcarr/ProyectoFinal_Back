// src/routes/api/pedido.routes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../../controllers/pedido.controller');
const { checkToken, checkAdmin, checkRol, checkEncargado, checkOperario, checkJefe } = require('../../utils/middleware');

// Ruta para obtener todos los pedidos (solo encargados y jefes)
router.get('/', checkToken, checkEncargado, pedidoController.getAllPedidos);

// Ruta para obtener un pedido por su ID (solo encargados y jefes))
router.get('/:pedidoId', checkToken, checkEncargado, pedidoController.getPedidoById);

// Ruta para crear un nuevo pedido (solo operarios)
router.post('/', checkToken, checkOperario, pedidoController.createPedido);

// // Ruta para actualizar un pedido por su ID (solo operarios)
router.put('/:pedidoId', checkToken, checkOperario, pedidoController.updatePedido);

// Ruta para eliminar un pedido (solo jefes)
router.delete('/:pedidoId', checkToken, checkJefe, pedidoController.deletePedido);

module.exports = router;
