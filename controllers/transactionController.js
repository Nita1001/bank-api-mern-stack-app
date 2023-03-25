const Account = require('../models/accountSchema.js');
const Transaction = require('../models/transactionSchema.js');
const createTransaction = require('../middleware/createTransaction.js');

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
    try {
        const { userId, accountId, amount } = req.body;
        const account = await Account.findOneAndUpdate(
            { _id: accountId, userId: userId },
            { $inc: { credit: amount } },
            { new: true, runValidators: true });

        if (!account) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Credit updated successfully', account });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }

};

exports.transferMoney = async (req, res) => {
    try {
        const { fromAccountId, toAccountId, amount } = req.body;

        const fromAccount = await Account.findById(fromAccountId);
        const toAccount = await Account.findById(toAccountId);

        if (!fromAccount) {
            return res.status(404).json({ message: 'From account not found' });
        }

        if (!toAccount) {
            return res.status(404).json({ message: 'To account not found' });
        }

        const totalBalance = fromAccount.balance + fromAccount.credit;
        if (totalBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const updatedFromAccount = await Account
            .findOneAndUpdate(
                { _id: fromAccountId, balance: { $gte: amount } },
                { $inc: { balance: -amount } },
                { new: true }
            );
        if (!updatedFromAccount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        await Account
            .findByIdAndUpdate(
                toAccountId,
                { $inc: { balance: amount } },
                { new: true }
            );

        // Creating transaction data and storing it in the transaction arrays of both accounts
        const transaction = await createTransaction(fromAccountId, toAccountId, amount);
        fromAccount.transactions
            .push({
                _id: transaction.id,
                to: toAccountId,
                amount: amount
            });
        toAccount.transactions.push({
            _id: transaction.id,
            from: fromAccountId,
            amount: amount
        });
        await Promise.all([fromAccount.save(), toAccount.save()]);

        res.json({
            message: 'Transfer completed successfully',
            fromAccount: fromAccountId,
            toAccount: toAccountId,
            amount: amount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getUsersTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Get all transactions for the user
        const transactions = await Transaction.find({ userId });

        res.json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};