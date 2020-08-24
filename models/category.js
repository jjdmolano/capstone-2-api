const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema ({
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    transactions: [
        {
            transactionId: {
                type: String,
                required: [true, 'Transaction ID is required']
            },
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
            }
        }
    ]
})

module.exports = mongoose.model('category', categorySchema)