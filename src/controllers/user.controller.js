// src/controllers/user.controller.js
const {
  selectAll,
  insertUser,
  selectById,
  updateUserById,
  deleteById,
  selectByEmailAndPassword,
  selectByEmail,
  selectAllFromRol,
  selectAllFromRolInAlmacen,
} = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/helpers');

const getAllUsers = async (req, res, next) => {
  try {
    const [result] = await selectAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const [user] = await selectById(userId);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    next(error);
  }
};

const getAllOperario = async (req, res, next) => {
  try {
    const [operarios] = await selectAllFromRol('operario');
    res.json(operarios);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};

const getAllOperarioByAlmacen = async (req, res, next) => {
  const { almacen_id } = req.params;
  try {
    if (!almacen_id) {
      return res.status(400).json({ error: 'Es necesario el ID del almacén' });
    }
    const [operarios] = await selectAllFromRolInAlmacen('operario', almacen_id);
    res.json(operarios);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};

const getAllEncargado = async (req, res, next) => {
  try {
    const [encargados] = await selectAllFromRol('encargado');
    res.json(encargados);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};

const getAllEncargadoByAlmacen = async (req, res, next) => {
  const { almacen_id } = req.params;
  try {
    if (!almacen_id) {
      return res.status(400).json({ error: 'Es necesario el ID del almacén' });
    }
    const [encargados] = await selectAllFromRolInAlmacen(
      'encargado',
      almacen_id
    );
    res.json(encargados);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Correo y contraseña son requeridos' });
  }

  try {
    const [user] = await selectByEmailAndPassword(email);

    if (!user || user.length === 0) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user[0].password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: 'Correo o contraseña incorrectos' });
    }

    // Generar el token JWT después de una autenticación exitosa
    const token = createToken(user[0]); // Llamada a la función `createToken` que creará el token JWT

    // Devolver el token en la respuesta
    res.json({
      message: 'Autenticación exitosa',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { nombre, apellido, email, password, rol, almacen_id } = req.body;

  if (!almacen_id) {
    return res
      .status(400)
      .json({ message: 'El ID del almacén es obligatorio' });
  }

  if (!rol || !['encargado', 'jefe', 'operario'].includes(rol)) {
    return res
      .status(400)
      .json({ message: 'El rol proporcionado no es válido' });
  }

  try {
    const [result] = await insertUser(req.body);
    const insertId = result.insertId;
    const [user] = await selectById(insertId);
    res.status(201).json(user[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { nombre, apellido, email, rol, almacen_id } = req.body;

  if (!nombre || !apellido || !email || !rol || !almacen_id) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [existingUser] = await selectById(userId);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await updateUserById(userId, req.body);
    const [updatedUser] = await selectById(userId);
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const [user] = await selectById(userId);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await deleteById(userId);
    res.json({ message: 'Usuario eliminado correctamente', usuario: user[0] });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    next(error);
  }
};

const checkEmail = async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'El email es obligatorio' });
  }

  try {
    const [user] = await selectByEmail(email); // *** Consulta para verificar el email ***

    if (user.length > 0) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Error al verificar el email:', error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllOperario,
  getAllOperarioByAlmacen,
  getAllEncargado,
  getAllEncargadoByAlmacen,
  createUser,
  getById,
  updateUser,
  deleteUser,
  authenticateUser,
  checkEmail,
};
