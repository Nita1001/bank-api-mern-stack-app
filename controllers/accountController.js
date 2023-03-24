const Account = require('../models/accountSchema.js');
const Transaction = require('../models/transactionSchema.js');

exports.createAccount = async (userId) => {
    try {
        const account = new Account({
            userId,
            balance: 0,
            credit: 0
        });
        const savedAccount = await account.save();
        return savedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};