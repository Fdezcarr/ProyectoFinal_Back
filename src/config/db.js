const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'logistica_almacen'
    
});

module.exports = pool.promise();