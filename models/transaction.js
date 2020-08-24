const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    date: {
        type: Date,
        default: new Date()
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    }
})

module.exports = mongoose.model('transaction', transactionSchema)