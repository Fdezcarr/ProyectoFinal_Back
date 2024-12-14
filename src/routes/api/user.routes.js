const { getAllUsers, createUser, updateUser, deleteUser, checkEmail, getAllOperario, getAllEncargado, getAllOperarioByAlmacen, getAllEncargadoByAlmacen } = require('../../controllers/user.controller');
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

// Ruta para ver todos los operarios
router.get('/operario', checkToken, getAllOperario);

// Ruta para ver todos los operarios por almacén
router.get('/operario/:almacen_id', checkToken, getAllOperarioByAlmacen);

// Ruta para ver todos los encargados
router.get('/encargado', checkToken, getAllEncargado);

// Ruta para ver todos los encargados por almacén
router.get('/encargado/:almacen_id', checkToken, getAllEncargadoByAlmacen);


router.get('/checkEmail', checkToken, checkEmail);

module.exports = router;
