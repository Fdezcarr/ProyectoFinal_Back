const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Prog@d.a.g.',
    port: 3306,
    database: 'logisticaAlmacen'
    
});

module.exports = pool.promise();