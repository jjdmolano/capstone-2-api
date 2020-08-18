const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required']
    },
    isExpense: {
        type: Boolean,
        default: true
    },
    transactions: [
        {
            transactionId: {
                type: String,
                required: [true, 'Transaction is required']
            },
            createdOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

module.exports = mongoose.model('category', categorySchema)