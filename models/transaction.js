const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('transaction', transactionSchema)