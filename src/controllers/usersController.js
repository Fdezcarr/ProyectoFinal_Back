
const getAllUsers = async (req, res, next) => {
    try {
        const [result] = await selectAll()
        res.json(result);
    } catch (error) {
        next(error);
    }
}


const createUsers = async (req, res, next) => {

    try {
        // Insertar el nuevo cliente
        const [result] = await insertCliente(req.body);
        // Recuperar los datos del nuevo cliente
        const cliente = await selectById(result.insertId);

        res.json(cliente);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    const { clienteId } = req.params;

    try {
        const [result] = await updateClienteById(clienteId, req.body);
        const cliente = await selectById(clienteId);
        res.json(cliente);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    const { clienteId } = req.params;

    try {
        const cliente = await selectById(clienteId);
        await deleteById(clienteId);
        res.json(cliente);
    } catch (error) {
        next(error);
    }
}