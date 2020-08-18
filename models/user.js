const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'First name is required']
    },
    categories: [
        {
            categoryId: {
                type: String,
                required: [true, 'Category is required']
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
        }
    ]
})

module.exports = mongoose.model('user', userSchema)