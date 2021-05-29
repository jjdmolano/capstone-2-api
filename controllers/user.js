const User = require('../models/user')
const auth = require('../auth')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const clientId =
	'668311413806-037mvt89p941msquk95tk75mj27mb699.apps.googleusercontent.com'
require('dotenv').config()

// USER CONTROLLERS
// Register user
module.exports.register = params => {
	const user = new User({
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		password: bcrypt.hashSync(params.password, 10)
	})

	return user.save().then((user, err) => {
		if (user !== null) {
			return err ? false : true
		}
	})
}

// Login user
module.exports.login = params => {
	return User.findOne({ email: params.email }).then(user => {
		if (user === null) {
			return false
		}

		const passwordCheck = bcrypt.compareSync(params.password, user.password)

		if (passwordCheck) {
			return {
				accessToken: auth.createAccessToken(user.toObject())
			}
		} else {
			return false
		}
	})
}

// Get user details
module.exports.getDetails = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		user.password = undefined
		return user
	})
}

// Login user through Google
module.exports.verifyGoogleTokenId = async tokenId => {
	const client = new OAuth2Client(clientId)
	const data = await client.verifyIdToken({
		idToken: tokenId,
		audience: clientId
	})

	if (data.payload.email_verified === true) {
		const user = await User.findOne({ email: data.payload.email }).exec()
		if (user != null) {
			return { accessToken: auth.createAccessToken(user.toObject()) }
		} else {
			const newUser = new User({
				firstName: data.payload.given_name,
				lastName: data.payload.family_name,
				email: data.payload.email
			})

			return newUser.save().then((user, err) => {
				return { accessToken: auth.createAccessToken(user.toObject()) }
			})
		}
	} else {
		return { err: 'google-auth-error' }
	}
}

// CATEGORY CONTROLLERS
// Add user category
module.exports.addCategory = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		// Duplicate category check
		const duplicate = user.categories.find(
			category =>
				category.categoryName.toLowerCase() ===
				params.categoryName.toLowerCase()
		)
		if (duplicate) {
			return false
		} else {
			user.categories.push({
				categoryName: params.categoryName,
				categoryType: params.categoryType
			})
			return user.save().then((updatedUser, err) => {
				return err ? false : true
			})
		}
	})
}

// Delete user category
module.exports.deleteCategory = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		user.categories.pull({
			_id: params.categoryId
		})
		return user.save().then((updatedUser, err) => {
			updatedUser.transactions
				.filter(transaction => transaction.categoryId == params.categoryId)
				.map(transaction => {
					updatedUser.transactions.pull({
						_id: transaction._id
					})
				})
			return user.save().then((updatedUser, err) => {
				return err ? false : true
			})
		})
	})
}

// TRANSACTION CONTROLLERS
// Add user transaction
module.exports.addTransaction = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		user.transactions.push({
			categoryId: params.categoryId,
			categoryName: params.categoryName,
			categoryType: params.categoryType,
			amount: params.amount,
			description: params.description
		})
		return user.save().then((updatedUser, err) => {
			return err ? false : true
		})
	})
}

// Delete user transaction
module.exports.deleteTransaction = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		user.transactions.pull({
			_id: params.transactionId
		})
		return user.save().then((updatedUser, err) => {
			return err ? false : true
		})
	})
}

// Update user transaction
module.exports.updateTransaction = params => {
	return User.findById(params.userId).then((user, err) => {
		if (err) return false
		const [filteredTransaction] = user.transactions.filter(
			transaction => transaction._id == params.transactionId
		)
		filteredTransaction.categoryId = params.categoryId
		filteredTransaction.categoryName = params.categoryName
		filteredTransaction.categoryType = params.categoryType
		filteredTransaction.amount = params.amount
		filteredTransaction.description = params.description
		return user.save().then((updatedUser, err) => {
			return err ? false : true
		})
	})
}
