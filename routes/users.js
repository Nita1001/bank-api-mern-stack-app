const express = require('express');
const router = express.Router();
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController.js');

// Create new user
router.post('/', createUser);

// Get users
router.get('/', getUsers);

// Get a single user
router.get('/:id', getUser);

router.put('/:id', updateUser)

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;