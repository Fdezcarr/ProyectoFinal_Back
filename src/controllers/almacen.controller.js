// src/controllers/almacen.controller.js
const { selectAllAlmacenes, insertAlmacen, selectAlmacenById, updateAlmacenById, deleteAlmacenById } = require('../models/almacen.model');

const getAllAlmacenes = async (req, res, next) => {
    try {
        const [result] = await selectAllAlmacenes();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getAlmacenById = async (req, res, next) => {
    const { almacenId } = req.params;
    try {
        const [almacen] = await selectAlmacenById(almacenId);

        if (almacen.length === 0) {
            return res.status(404).json({ message: "Almacén no encontrado" });
        }

        res.json(almacen[0]);
    } catch (error) {
        next(error);
    }
};

const createAlmacen = async (req, res, next) => {
    try {
        const [result] = await insertAlmacen(req.body);
        const insertId = result.insertId;

        const [almacen] = await selectAlmacenById(insertId);
        res.status(201).json(almacen[0]);
    } catch (error) {
        next(error);
    }
};

const updateAlmacen = async (req, res, next) => {
    const { almacenId } = req.params;
    try {
        const [existingAlmacen] = await selectAlmacenById(almacenId);

        if (existingAlmacen.length === 0) {
            return res.status(404).json({ message: "Almacén no encontrado" });
        }

        await updateAlmacenById(almacenId, req.body);
        const [updatedAlmacen] = await selectAlmacenById(almacenId);
        res.json(updatedAlmacen[0]);
    } catch (error) {
        next(error);
    }
};

const deleteAlmacen = async (req, res, next) => {
    const { almacenId } = req.params;
    try {
        const [almacen] = await selectAlmacenById(almacenId);

        if (almacen.length === 0) {
            return res.status(404).json({ message: "Almacén no encontrado" });
        }

        await deleteAlmacenById(almacenId);
        res.json({ message: "Almacén eliminado correctamente", almacen: almacen[0] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAlmacenes,
    getAlmacenById,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen
};
