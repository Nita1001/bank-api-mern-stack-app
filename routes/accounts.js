const express = require('express');
const router = express.Router();
const { createAccount } = require('../controllers/accountController.js');

// Create new account
router.post('/', createAccount);

module.exports = router;