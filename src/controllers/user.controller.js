// src/controllers/user.controller.js
const { selectAll, insertUser, selectById, updateUserById, deleteById, selectByEmailAndPassword, selectByEmail } = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const { createToken } = require('../utils/helpers');

const getAllUsers = async (req, res, next) => {
    try {
        const [result] = await selectAll();
        console.log('Usuarios obtenidos:', result); 
        res.json(result);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);  
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [user] = await selectById(userId);
        console.log('Usuario obtenido por ID:', user); 
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user[0]);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);  
        next(error);
    }
};

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    try {
     
        const [user] = await selectByEmailAndPassword(email);

       
        if (!user || user.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

 
        const isPasswordValid = bcrypt.compareSync(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        // Generar el token JWT después de una autenticación exitosa
        const token = createToken(user[0]);  // Llamada a la función `createToken` que creará el token JWT

        // Devolver el token en la respuesta
        res.json({
            message: "Autenticación exitosa",
            token: token, 
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const [result] = await insertUser(req.body);
        console.log('Usuario creado con ID:', result.insertId); 
        const insertId = result.insertId;
        const [user] = await selectById(insertId);
        res.status(201).json(user[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [existingUser] = await selectById(userId);
        console.log('Usuario a actualizar:', existingUser); 
        if (existingUser.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await updateUserById(userId, req.body);
        const [updatedUser] = await selectById(userId);
        res.json(updatedUser[0]);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);  
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [user] = await selectById(userId);
        console.log('Usuario a eliminar:', user); 
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await deleteById(userId);
        res.json({ message: "Usuario eliminado correctamente", usuario: user[0] });
    } catch (error) {
        console.error('Error al eliminar usuario:', error); 
        next(error);
    }
};

const checkEmail = async (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "El email es obligatorio" });
    }

    try {
        const [user] = await selectByEmail(email); // *** Consulta para verificar el email ***
        console.log('Resultado de la verificación de email:', user); 

        if (user.length > 0) {
            return res.status(200).json({ exists: true });
        }

        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error al verificar el email:', error);  
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getById,
    updateUser,
    deleteUser,
    authenticateUser,
    checkEmail
};
