const Account = require('../models/accountSchema.js');
const Transaction = require('../models/transactionSchema.js');

// Deposit cash to a user's account
exports.depositCash = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        console.log('1111', req.body)
        const account = await Account.findOneAndUpdate(
            { _id: accountId, userId: userId },
            { $inc: { balance: amount } },
            { new: true }
        );
        console.log('2222', account)

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const transaction = new Transaction(
            {
                type: 'deposit',
                amount,
                accountId
            });
        await transaction.save();

        res.json({ message: 'Cash deposited successfully', account });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


// Withdraw money from the user's account
exports.withdrawMoney = async (req, res) => {
    try {
        const { userId, accountId, amount } = req.body;
        const account = await Account.findOne({ _id: accountId, userId: userId });

        if (!account) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (account.balance + account.credit < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const newBalance = account.balance - amount;

        const updatedAccount = await Account
            .findOneAndUpdate(
                { _id: accountId, userId: userId },
                { balance: newBalance },
                { new: true }
            );

        const transaction = new Transaction({
            type: 'withdrawal',
            amount,
            accountId
        });
        await transaction.save();

        res.json({ message: 'Cash withdrawn successfully', account: updatedAccount })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update user's credit
exports.updateCredit = async (req, res) => {
    console.log('update credit');
};

exports.transferMoney = () => {
    console.log('transfer money');
}