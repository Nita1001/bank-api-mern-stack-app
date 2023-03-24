const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    credit: {
        type: Number,
        default: 0,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Credit must be a positive number.'
        }
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

module.exports = mongoose.model('Account', accountSchema);