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
        type: String,
        required: [true, 'Password is required']
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
            categoryName: {
                type: String,
                required: [true, 'Category name is required']
            },
            categoryType: {
                type: String,
                required: [true, 'Category type is required']
            },
            amount: {
                type: String,
                required: [true, 'Amount is required']
            },
            description: {
                type: String
            },
            balanceAfterTransaction: {
                type: String
            },
            dateAdded: {
                type: Date,
                default: new Date()
            }
        }
    ]
})

module.exports = mongoose.model('user', userSchema)