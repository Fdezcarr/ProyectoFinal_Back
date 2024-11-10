// src/routes/api/almacen.routes.js
const express = require('express');
const router = express.Router();
const almacenController = require('../../controllers/almacen.controller');

// Obtener todos los almacenes
router.get('/', almacenController.getAllAlmacenes);

// Obtener un almacén por su ID
router.get('/:almacenId', almacenController.getAlmacenById);

// Crear un nuevo almacén
router.post('/', almacenController.createAlmacen);

// Actualizar un almacén por su ID
router.put('/:almacenId', almacenController.updateAlmacen);

// Eliminar un almacén por su ID
router.delete('/:almacenId', almacenController.deleteAlmacen);

module.exports = router;
