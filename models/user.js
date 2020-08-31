const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String
    },
    categories: [
        {
            categoryName: {
                type: String,
                required: [true, 'Category name is required']
            },
            categoryType: {
                type: String,
                required: [true, 'Category type is required']
            },
        }
    ],
    transactions: [
        {
            categoryId: {
                type: String,
                required: [true, 'Category ID is required']
            },
            categoryName: {
                type: String,
                required: [true, 'Category name is required']
            },
            categoryType: {
                type: String,
                required: [true, 'Category type is required']
            },
            amount: {
                type: Number,
                required: [true, 'Amount is required']
            },
            description: {
                type: String,
                required: [true, 'Description is required']
            },
            balanceAfterTransaction: {
                type: Number
            },
            dateAdded: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

module.exports = mongoose.model('user', userSchema)