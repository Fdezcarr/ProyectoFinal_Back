// src/routes/api/auth.routes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../controllers/user.controller');

// Ruta para autenticar usuario (login)
router.post('/login', authenticateUser);

module.exports = router;
