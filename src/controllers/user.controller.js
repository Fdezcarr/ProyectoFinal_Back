const { selectAll, insertUser, selectById, updateUserById, deleteById } = require('../models/user.model');

const getAllUsers = async (req, res, next) => {
    try {
        const [result] = await selectAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [cliente] = await selectById(userId);

        if (cliente.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(cliente[0]);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const [result] = await insertUser(req.body);
        const insertId = result.insertId;

        const [cliente] = await selectById(insertId);
        res.status(201).json(cliente[0]);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [existingUser] = await selectById(userId);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await updateUserById(userId, req.body);
        const [updatedUser] = await selectById(userId);
        res.json(updatedUser[0]);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [cliente] = await selectById(userId);

        if (cliente.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await deleteById(userId);
        res.json({ message: "Usuario eliminado correctamente", usuario: cliente[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers, createUser, getById, updateUser, deleteUser
};
