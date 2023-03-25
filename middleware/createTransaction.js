const Transaction = require('../models/transactionSchema.js');
const Account = require('../models/accountSchema.js');
const mongoose = require('mongoose');

const createTransaction = async (fromAccountId, toAccountId, amount) => {
    const transactionData = {
        type: 'transfer',
        accountId: fromAccountId,
        toAccountId: toAccountId,
        amount: amount
    };

    const transaction = new Transaction(transactionData);
    await transaction.save();

    return transaction;
};

module.exports = createTransaction;