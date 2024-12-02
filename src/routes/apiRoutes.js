// src/routes/apiRoutes.js
const router = require('express').Router();

router.use('/users', require('./api/user.routes'));
router.use('/pedidos', require('./api/pedido.routes'));
router.use('/almacenes', require('./api/almacen.routes'));
router.use('/auth', require('./api/auth.routes'));  // Registrar las rutas de autenticación

module.exports = router;
