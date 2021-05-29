const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		required: [true, 'First name is required']
	},
	lastName: {
		type: String,
		trim: true,
		required: [true, 'Last name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		trim: true
	},
	categories: [
		{
			categoryName: {
				type: String,
				trim: true,
				required: [true, 'Category name is required']
			},
			categoryType: {
				type: String,
				trim: true,
				required: [true, 'Category type is required']
			}
		}
	],
	transactions: [
		{
			categoryId: {
				type: String,
				trim: true,
				required: [true, 'Category ID is required']
			},
			categoryName: {
				type: String,
				trim: true,
				required: [true, 'Category name is required']
			},
			categoryType: {
				type: String,
				trim: true,
				required: [true, 'Category type is required']
			},
			amount: {
				type: Number,
				trim: true,
				required: [true, 'Amount is required']
			},
			description: {
				type: String,
				trim: true,
				required: [true, 'Description is required']
			},
			balanceAfterTransaction: {
				type: Number
			},
			dateAdded: {
				type: Date,
				default: Date.now
			}
		}
	]
})

module.exports = mongoose.model('user', userSchema)
