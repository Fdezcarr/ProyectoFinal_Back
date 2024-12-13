const pool = require('../config/db');
const bcrypt = require('bcryptjs');

function selectAll() {
    return pool.query('SELECT * FROM usuarios;');
}

function selectByEmailAndPassword(email) {
    return pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
}

function insertUser(data) {
    const { nombre, apellido, email, password, rol, almacenId } = data;
    const hashedPassword = bcrypt.hashSync(password, 8);
    return pool.query(
        'INSERT INTO usuarios (nombre, apellido, email, password, rol, almacenId ) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, hashedPassword, rol, almacenId ]
    );
}

function selectById(id) {
    return pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
}

function updateUserById(id, data) {
    const { nombre, apellido, email, password, rol, almacenId } = data;
    const hashedPassword = password ? bcrypt.hashSync(password, 8) : null;

    let query = 'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, rol = ?';
    const values = [nombre, apellido, email, rol];

    if (hashedPassword) {
        query += ', password = ?';
        values.push(hashedPassword);
    }

    if (almacenId) { 
        query += ', almacenId = ?'; 
        values.push(almacenId); 
    }

    query += ' WHERE id = ?';
    values.push(id);

    return pool.query(query, values);
}

function deleteById(id) {
    return pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
}

module.exports = {
    selectAll,
    insertUser,
    selectById,
    updateUserById,
    deleteById, 
    selectByEmailAndPassword
};
