// src/routes/api/almacen.routes.js
const express = require('express');
const router = express.Router();
const almacenController = require('../../controllers/almacen.controller');
const { checkToken, checkJefe } = require('../../utils/middleware');

// Obtener todos los almacenes
router.get('/', almacenController.getAllAlmacenes);

// Obtener un almacén por su ID
router.get('/:almacenId', almacenController.getAlmacenById);

// Crear un nuevo almacén
router.post('/', checkToken, checkJefe, almacenController.createAlmacen);

// Actualizar un almacén por su ID
router.put('/:almacenId',  checkToken, checkJefe, almacenController.updateAlmacen);

// Eliminar un almacén por su ID
router.delete('/:almacenId',  checkToken, checkJefe, almacenController.deleteAlmacen);

module.exports = router;
