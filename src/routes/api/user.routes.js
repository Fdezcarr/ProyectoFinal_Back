const { getAllUsers, createUser, updateUser, deleteUser, authenticateUser } = require('../../controllers/user.controller');

const router = require('express').Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.post('/authenticate', authenticateUser);

module.exports = router;