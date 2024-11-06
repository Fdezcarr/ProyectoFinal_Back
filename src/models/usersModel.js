const  pool  = require("../config/db")


function selectAll() {
    return pool.query('select * from usuarios;')
}


module.exports = {
    selectAll
}