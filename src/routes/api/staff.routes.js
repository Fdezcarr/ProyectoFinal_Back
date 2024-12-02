// src/routes/api/staff.routes.js
const express = require('express');
const router = express.Router();
const { getAllStaff, getStaffById, createStaff, updateStaff, deleteStaff } = require('../../controllers/staff.controller');
const { checkToken, checkAdmin } = require('../../utils/middleware');

// Ruta para obtener todos los usuarios (solo administradores)
router.get('/', checkToken, checkAdmin, getAllStaff);

// Ruta para obtener un usuario por ID (solo administradores)
router.get('/:staffId', checkToken, checkAdmin, getStaffById);

// Ruta para crear un nuevo usuario (solo administradores)
router.post('/', checkToken, checkAdmin, createStaff);

// Ruta para actualizar un usuario por ID (solo administradores)
router.put('/:staffId', checkToken, checkAdmin, updateStaff);

// Ruta para eliminar un usuario por ID (solo administradores)
router.delete('/:staffId', checkToken, checkAdmin, deleteStaff);

module.exports = router;
