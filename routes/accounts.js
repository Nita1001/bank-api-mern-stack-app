const express = require('express');
const router = express.Router();
const { createAccount, getAccount } = require('../controllers/accountController.js');

// Create new account
router.post('/', createAccount);

// Get account by Id
router.get('/:id', getAccount);

module.exports = router;