// src/controllers/staff.controller.js
const { selectById, insertUser, selectAll, updateUserById, deleteById } = require('../models/user.model'); // Usamos las funciones de user.model.js

// Obtener todos los usuarios (staff)
const getAllStaff = async (req, res, next) => {
    try {
        const [staff] = await selectAll();
        res.json(staff);
    } catch (error) {
        next(error);
    }
};

// Obtener un usuario por su ID
const getStaffById = async (req, res, next) => {
    const { staffId } = req.params;
    try {
        const [staff] = await selectById(staffId);

        if (staff.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(staff[0]);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo usuario
const createStaff = async (req, res, next) => {
    try {
        const [result] = await insertUser(req.body);
        const insertId = result.insertId;
        const [newStaff] = await selectById(insertId);
        res.status(201).json(newStaff[0]);
    } catch (error) {
        next(error);
    }
};

// Actualizar un usuario por su ID
const updateStaff = async (req, res, next) => {
    const { staffId } = req.params;
    try {
        const [existingStaff] = await selectById(staffId);
        if (existingStaff.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        await updateUserById(staffId, req.body);
        const [updatedStaff] = await selectById(staffId);
        res.json(updatedStaff[0]);
    } catch (error) {
        next(error);
    }
};

// Eliminar un usuario por su ID
const deleteStaff = async (req, res, next) => {
    const { staffId } = req.params;
    try {
        const [staff] = await selectById(staffId);
        if (staff.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        await deleteById(staffId);
        res.json({ message: "Usuario eliminado correctamente", staff: staff[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff
};
