// src/utils/middleware.js
const jwt = require('jsonwebtoken');

const { selectById: selectClienteById } = require("../models/clientesModel");
const { selectById: selectStaffById } = require('../models/staffModel');

// Middleware para verificar si un cliente existe por su ID
const checkClienteId = async (req, res, next) => {
    const { clienteId } = req.params;

    // Validar que clienteId sea un número
    if (isNaN(clienteId)) {
        return res.status(400).json({ message: 'El ID del cliente es incorrecto' });
    }

    // Comprobar si el cliente existe en la base de datos
    try {
        const [cliente] = await selectClienteById(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'El cliente no existe en la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error interno al verificar el cliente' });
    }

    next();
};

// Middleware para verificar la validez de un token JWT
const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar si la cabecera de autorización está presente
    if (!authHeader) {
        return res.status(403).json({ message: 'Debes incluir la cabecera de Authorization' });
    }

    const token = authHeader.split(' ')[1]; // El formato esperado es "Bearer <token>"

    // Verificar el token JWT
    let data;
    try {
        data = jwt.verify(token, 'clave super secreta');
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto o ha expirado' });
    }

    // Comprobar si el usuario codificado en el token existe
    try {
        const [usuario] = await selectStaffById(data.usuario_id);
        if (!usuario) {
            return res.status(403).json({ message: 'El usuario no existe en la base de datos' });
        }

        req.user = usuario; // Adjuntar el usuario al objeto `req`
    } catch (error) {
        return res.status(500).json({ message: 'Error interno al verificar el token' });
    }

    next();
};

// Middleware para comprobar si el usuario es administrador
const checkAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Debes ser administrador para acceder a este recurso' });
    }
    next();
};

// Middleware para verificar si el usuario tiene un rol específico
const checkRol = (rol) => {
    return (req, res, next) => {
        if (req.user.rol !== rol) {
            return res.status(403).json({ message: `Acceso denegado. Requiere el rol: ${rol}` });
        }
        next();
    };
};

module.exports = {
    checkClienteId,
    checkToken,
    checkAdmin,
    checkRol
};
