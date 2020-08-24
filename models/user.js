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
    categories: [
        {
            category: {
                type: String,
                required: [true, 'Category is required']
            },
            transactions: [
                {
                    type: String,
                    required: [true, 'Transaction is required']
                }
            ]
        }
    ]
})

module.exports = mongoose.model('user', userSchema)