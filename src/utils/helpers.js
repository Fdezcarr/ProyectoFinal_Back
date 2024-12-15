// src/utils/helpers.js
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');



// Crear un token JWT
const createToken = (usuario) => {
    const data = {
        usuario_id: usuario.id,
        usuario_rol: usuario.rol,
        usuario_nombre: usuario.nombre,
        usuario_email: usuario.email,
    };
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// Verificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido');
    }
};

// Formateo fechas
const formateoFecha = (fecha) => {
    return dayjs(fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

module.exports = {
    createToken,
    verifyToken,
    formateoFecha
};
