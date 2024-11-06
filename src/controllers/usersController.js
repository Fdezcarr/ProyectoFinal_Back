const { selectAll } = require("../models/usersModel");

const getAllUsers = async (req, res, ) => {
    const result = await selectAll()
    console.log(result);

    res.json({
        message: 'Recupera todos los users'
    });


    /* try {
        const [result] = await selectAll()
        res.json(result);
    } catch (error) {
        next(error);
    } */
}


const createUser = async (req, res, ) => {
    res.json({
        message: 'Crea todos los users'
    });

   /* try {
        // Insertar el nuevo cliente
        const [result] = await insertCliente(req.body);
        // Recuperar los datos del nuevo cliente
        const cliente = await selectById(result.insertId);

        res.json(cliente);
    } catch (error) {
        next(error);
    }*/
}

const updateUser = async (req, res, ) => {
    res.json({
        message: 'Actualiza todos los users'
    });
    
   /* const { clienteId } = req.params;
   try {
        const [result] = await updateClienteById(clienteId, req.body);
        const cliente = await selectById(clienteId);
        res.json(cliente);
    } catch (error) {
        next(error);
    }*/
}

const deleteUser = async (req, res, ) => {
    res.json({
        message: 'Borra todos los users'
    })


  /*  const { clienteId } = req.params;

    try {
        const cliente = await selectById(clienteId);
        await deleteById(clienteId);
        res.json(cliente);
    } catch (error) {
        next(error);
    } */
}

module.exports = {
    getAllUsers, createUser, updateUser, deleteUser
}