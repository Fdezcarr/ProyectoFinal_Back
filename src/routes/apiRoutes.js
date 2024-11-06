const router = require('express').Router();

router.use('/users', require('./api/apiUsersRoutes'));

module.exports = router;