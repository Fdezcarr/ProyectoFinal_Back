const router = require('express').Router();

router.use('/users', require('./api/user.routes'));
router.use('/pedidos', require('./api/pedido.routes'));

module.exports = router;