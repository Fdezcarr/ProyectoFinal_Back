<<<<<<< HEAD
const { getAllUsers, createUser, updateUser, deleteUser, authenticateUser } = require('../../controllers/user.controller');

const router = require('express').Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.post('/authenticate', authenticateUser);
=======
const { getAllUsers, createUser, updateUser, deleteUser } = require('../../controllers/user.controller');
const { checkToken, checkAdmin, checkRol } = require('../../utils/middleware');

const router = require('express').Router();

// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/', checkToken, checkAdmin, getAllUsers);
>>>>>>> origin/develop

// Ruta para crear un nuevo usuario (solo para administradores)
router.post('/', checkToken, checkAdmin, createUser);

// Ruta para actualizar un usuario (disponible para el usuario o administradores)
router.put('/:userId', checkToken, checkRol('admin'), updateUser);

// Ruta para eliminar un usuario (solo para administradores)
router.delete('/:userId', checkToken, checkAdmin, deleteUser);

module.exports = router;
