const Account = require('../models/accountSchema.js');
const Transaction = require('../models/transactionSchema.js');

exports.createAccount = async (userId) => {
    try {
        const account = new Account({
            userId: userId,
            balance: 0,
            credit: 0
        });
        const savedAccount = await account.save();
        return savedAccount;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json(account);
        }
        res.status(200).json(account);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}