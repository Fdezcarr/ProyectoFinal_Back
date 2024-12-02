// src/utils/middleware.js
const jwt = require('jsonwebtoken');
const { selectById: selectStaffById } = require('../models/staffModel');

// Middleware para verificar la validez de un token JWT
const checkToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Debes incluir la cabecera de Authorization' });
    }

    const token = authHeader.split(' ')[1];  // "Bearer <token>"

    let data;
    try {
        data = jwt.verify(token, 'clave super secreta');
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto o ha expirado' });
    }

    try {
        const [usuario] = await selectStaffById(data.usuario_id);
        if (!usuario) {
            return res.status(403).json({ message: 'El usuario no existe en la base de datos' });
        }

        req.user = usuario;  // Adjuntar el usuario al objeto `req`
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

// Exportar las funciones
module.exports = {
    checkToken,
    checkAdmin,
    checkRol
};
