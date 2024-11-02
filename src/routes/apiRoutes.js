const { Router } = require("express").Router();

router.use('/users', require('./api/apiUsersRoutes'));

module.exports = Router