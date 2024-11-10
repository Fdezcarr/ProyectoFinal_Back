const router = require('express').Router();

router.use('/users', require('./api/user.routes'));
router.use('/pedidos', require('./api/pedido.routes'));
router.use('/almacenes', require('./api/almacen.routes'));

module.exports = router;