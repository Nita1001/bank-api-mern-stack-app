const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['withdrawal', 'deposit']
    },
    user: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);