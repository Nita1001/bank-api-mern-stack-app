const express = require('express');
const router = express.Router();
const {
    depositCash,
    updateCredit,
    withdrawMoney,
    transferMoney,
    getUsersTransactions
} = require('../controllers/transactionController.js');

// Deposit cash to a user's account
router.post('/deposit', depositCash);

// Withdraw money from the user's account
router.post('/withdraw', withdrawMoney);

// Update user's credit
router.put('/credit', updateCredit);

// Transfer money from one user's account to another with credit
router.post('/transfer', transferMoney);

//Get transactions 
router.get('/UsersData/:id', getUsersTransactions);


module.exports = router;