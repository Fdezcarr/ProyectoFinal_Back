const jwt = require('jsonwebtoken');

const { selectById: selectClienteById } = require("../models/user.model");
const { selectById: selectStaffById } = require('../models/staffModel');

const checkClienteId = async (req, res, next) => {
    const { clienteId } = req.params;

    // Si el clienteId es un número
    if (isNaN(clienteId)) {
        return res.status(400).json({ message: 'El id del cliente es incorrecto' });
    }

    // Si el id del cliente existe en la BD
    const cliente = await selectClienteById(clienteId);
    if (!cliente) {
        return res.status(404).json({ message: 'El id del cliente no existe en la BD' });
    }

    next();
}

const checkToken = async (req, res, next) => {
    // ¿Viene la cabecera Authorization incluida?
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Debes incluir la cabecera de Authorization' });
    }

    const token = req.headers['authorization'];

    // ¿El token es correcto?
    let data;
    try {
        data = jwt.verify(token, 'clave super secreta');
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto' });
    }

    // ¿El usuario codificado en el token existe?
    const usuario = await selectStaffById(data.usuario_id);
    if (!usuario) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    req.user = usuario;

    next();
}

const checkAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Debes ser administrador' });
    }
    next();
}

const checkRol = (rol) => {
    return (req, res, next) => {
        if (req.user.rol !== rol) {
            return res.status(403).json({ message: `Solo puedes pasar si tienes el rol: ${rol}` });
        }
        next()
    }
}

module.exports = {
    checkClienteId, checkToken, checkAdmin, checkRol
}