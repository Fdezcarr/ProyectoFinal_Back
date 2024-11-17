const { selectAll, insertUser, selectById, updateUserById, deleteById, selectByEmailAndPassword } = require('../models/user.model');
const bcrypt = require('bcryptjs'); 

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

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;
	console.log(req.body);
	

    if (!email || !password) {
        return res.status(400).json({ message: "Correo y contraseña son requeridos" });
    }

    try {
        // Usamos selectByEmailAndPassword solo con el email
        const [user] = await selectByEmailAndPassword(email);
		console.log(user);
		

        if (user.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        // Compara la contraseña proporcionada con la almacenada (encriptada)
        const isPasswordValid = bcrypt.compareSync(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        res.json({ message: "Autenticación exitosa", user: user[0] });
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
    getAllUsers, createUser, getById, updateUser, deleteUser, authenticateUser
};
