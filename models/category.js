const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema ({
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    isExpense: {
        type: Boolean,
        default: true
    },
    transactions: [
        {
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