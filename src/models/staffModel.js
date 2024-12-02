// src/models/staffModel.js
const pool = require('../config/db');

// Función para obtener un usuario por su ID
function selectById(id) {
    return pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
}

module.exports = {
    selectById
};
