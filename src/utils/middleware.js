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
    const auth = req.headers['authorization']
    if (!auth) {
        return res.status(403).json({ message: 'Debes incluir la cabecera de Authorization' });
    }


    const token = auth.replace('Bearer ', '');


    // ¿El token es correcto?
    let data;
    try {
        data = jwt.verify(token, 'clave super secreta');
        req.user = data
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto' });
    }

    // ¿El usuario codificado en el token existe?
    const usuario = await selectStaffById(data.usuario_id);
    if (!usuario) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    // req.user = usuario;
    // console.log('Decoded token:', req.user);

    next();
}

const checkAdmin = (req, res, next) => {
    if (req.user.usuario_rol !== 'admin') {
        return res.status(403).json({ message: 'Debes ser administrador' });
    }
    next();
}

const checkRol = (rol) => {
    return (req, res, next) => {
        if (req.user.usuario_rol !== rol) {
            return res.status(403).json({ message: `Solo puedes pasar si tienes el rol: ${rol}` });
        }
        next()
    }
}

const checkOperario = (req, res, next) => {
    if (req.user.usuario_rol !== 'operario') {
        return res.status(403).json({ message: 'Debes ser operario para acceder a este recurso' });
    }
    next();
};

const checkEncargado = (req, res, next) => {
    if (req.user.usuario_rol !== 'encargado') {
        return res.status(403).json({ message: 'Debes ser encargado para acceder a este recurso' });
    }
    next();
};

const checkJefe = (req, res, next) => {

    if (req.user.usuario_rol !== 'jefe') {
        return res.status(403).json({ message: 'Debes ser jefe para acceder a este recurso' });
    }
    next();
};

const checkOperarioOrJefe = (req, res, next) => {
    if (req.user.rol !== 'operario' && req.user.rol !== 'jefe') {
        return res.status(403).json({ message: 'Debes ser operario o jefe para acceder a este recurso' });
    }
    next();
};




module.exports = {
    checkClienteId, checkToken, checkAdmin, checkRol, checkOperario, checkEncargado, checkJefe, checkOperarioOrJefe
}