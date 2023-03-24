const User = require('../models/userSchema.js');
const { createAccount } = require('./accountController.js')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const user = new User({
            firstName,
            lastName,
            email,
        });
        const savedUser = await user.save();
        // create account for the user
        const account = await createAccount(savedUser.id);
        // set account property of the user to the new account
        savedUser.accountId = account;
        // save updated user
        await savedUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};