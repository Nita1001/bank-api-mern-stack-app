const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['withdrawal', 'deposit', 'transfer']
    },
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema);