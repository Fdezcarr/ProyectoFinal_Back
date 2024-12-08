// src/controllers/user.controller.js
const { selectAll, insertUser, selectById, updateUserById, deleteById, selectByEmailAndPassword } = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const { createToken } = require('../utils/helpers');

const getAllUsers = async (req, res, next) => {
    try {
        const [result] = await selectAll();
        console.log('Usuarios obtenidos:', result);  // Agregar log
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);  // Log de error
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [user] = await selectById(userId);
        console.log('Usuario obtenido por ID:', user);  // Agregar log
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user[0]);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);  // Log de error
        next(error);
    }
};

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    try {
        // Buscar al usuario por email
        const [user] = await selectByEmailAndPassword(email);

        // Verificar si el usuario existe
        if (!user || user.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        // Compara la contraseña proporcionada con la almacenada (encriptada)
        const isPasswordValid = bcrypt.compareSync(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        // Generar el token JWT después de una autenticación exitosa
        const token = createToken(user[0]);  // Llamada a la función `createToken` que creará el token JWT

        // Devolver el token en la respuesta
        res.json({
            message: "Autenticación exitosa",
            token: token,  // Incluye el token en la respuesta
            user: user[0]  // También puedes devolver los datos del usuario si lo deseas
        });
    } catch (error) {
        next(error);
    }
};

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    try {
        // Usamos selectByEmailAndPassword solo con el email
        const [user] = await selectByEmailAndPassword(email);

        if (user.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        // Compara la contraseña proporcionada con la almacenada (encriptada)
        const isPasswordValid = bcrypt.compareSync(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        res.json({ message: "Autenticación exitosa", user: user[0] });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const [result] = await insertUser(req.body);
        console.log('Usuario creado con ID:', result.insertId);  // Agregar log
        const insertId = result.insertId;
        const [user] = await selectById(insertId);
        res.status(201).json(user[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);  // Log de error
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [existingUser] = await selectById(userId);
        console.log('Usuario a actualizar:', existingUser);  // Agregar log
        if (existingUser.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await updateUserById(userId, req.body);
        const [updatedUser] = await selectById(userId);
        res.json(updatedUser[0]);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);  // Log de error
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [user] = await selectById(userId);
        console.log('Usuario a eliminar:', user);  // Agregar log
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await deleteById(userId);
        res.json({ message: "Usuario eliminado correctamente", usuario: user[0] });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);  // Log de error
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getById,
    updateUser,
    deleteUser,
    authenticateUser
};
