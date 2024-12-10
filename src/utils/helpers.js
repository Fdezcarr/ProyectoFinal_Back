// src/utils/helpers.js
const jwt = require('jsonwebtoken');

// Crear un token JWT
const createToken = (usuario) => {
    const data = {
        usuario_id: usuario.id,
        usuario_rol: usuario.rol,
        usuario_nombre: usuario.nombre,
        usuario_email: usuario.email,
    };
    return jwt.sign(data, 'clave super secreta', { expiresIn: '1h' }); // Expira en 1 hora
};

// Verificar un token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'clave super secreta');
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = {
    createToken,
    verifyToken
};
