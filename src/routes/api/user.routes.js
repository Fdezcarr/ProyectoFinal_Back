const { getAllUsers, createUser, updateUser, deleteUser } = require('../../controllers/user.controller');

const router = require('express').Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;