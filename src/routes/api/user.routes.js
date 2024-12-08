const { getAllUsers, createUser, updateUser, deleteUser } = require('../../controllers/user.controller');
const { checkToken, checkAdmin, checkRol, checkJefe } = require('../../utils/middleware');

const router = require('express').Router();

// Ruta para obtener todos los usuarios (solo jefes)
router.get('/', checkToken, checkJefe, getAllUsers);

// Ruta para crear un nuevo usuario (solo jefes)
router.post('/', checkToken, checkJefe, createUser);

// Ruta para actualizar un usuario (disponible para el usuario o administradores) 
router.put('/:userId', checkToken, checkJefe, updateUser);

// Ruta para eliminar un usuario (solo para administradores) 
router.delete('/:userId', checkToken, checkJefe, deleteUser);

module.exports = router;
