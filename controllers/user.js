const User = require('../models/user')
const auth = require('../auth')
const bcrypt = require('bcrypt')
require('dotenv').config()

// Register user
module.exports.register = (params) => {
    const user = new User({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: bcrypt.hashSync(params.password, 10)
    })

    return user.save()
    .then((user, err) => {
        if( user !== null) {
            return err ? false : true
        }
    })
}

// Login user
module.exports.login = (params) => {
    return User.findOne({ email: params.email })
    .then((user) => {
        if (user === null) {
            return false
        }

        const passwordCheck = bcrypt.compareSync(params.password, user.password)

        if(passwordCheck) {
            return {
                accessToken: auth.createAccessToken(user.toObject())
            }
        } else {
            return false
        }
    })
}

// Get user details
module.exports.getDetails = (params) => {
    return User.findById(params.userId)
    .then((user, err) => {
        if(err) return false
        user.password = undefined
        return user
    })
}

// Add user category
module.exports.addCategory = (params) => {
    return User.findById(params.userId)
    .then((user, err) => {
        if(err) return false
        // Duplicate category check
        const duplicate = user.categories.find(category => category.categoryName === params.categoryName)
        if(duplicate){
            return false
        } else {
            user.categories.push({
                categoryName: params.categoryName,
                categoryType: params.categoryType
            })
            return user.save()
            .then((updatedUser, err) => {
                return (err) ? false : true
            })
        }
    })
}

// Delete user category
module.exports.deleteCategory = (params) => {
    return User.findById(params.userId)
    .then((user,err) => {
        if (err) return false
        user.categories.remove({
            _id: params.categoryId
        })
        return user.save()
        .then((updatedUser, err) => {
            return (err) ? false : true
        })
    })
}

// Add user transaction
module.exports.addTransaction = (params) => {
    return User.findById(params.userId)
    .then((user, err) => {
        if(err) return false
        user.transactions.push({
            categoryName: params.categoryName,
            categoryType: params.categoryType,
            amount: params.amount,
            description: params.description
        })
        return user.save()
        .then((updatedUser, err) => {
            return (err) ? false : true
        })
        }
    )
}

// Delete user transaction
module.exports.deleteTransaction = (params) => {
    return User.findById(params.userId)
    .then((user,err) => {
        if (err) return false
        user.transactions.remove({
            _id: params.transactionId
        })
        return user.save()
        .then((updatedUser, err) => {
            return (err) ? false : true
        })
    })
}

// const {OAuth2Client, auth} = require('google-auth-library')

// module.exports.verifyGoogleTokenId = async(tokenId) => {
//     const client = new OAuth2Client(clientId)
//     const data = await client.verifyIdToken({ idToken: tokenId, audience: clientId })

//     if(data.payload.email_verified) {
//         const user = await (await User.findOne({email: data.payload.email})).exec()
//         if(user != null) {
//             return user.loginType === 'google'
//             ? {accessToken: auth.createAccessToken(user.toObject())}
//             : {error: 'login-type-error'}
//         } else {
//             const newUser = new User ({
//                 firstName: data.payload.given_name,
//                 lastName: data.payload.family_name,
//                 email: data.payload.email
//             })

//             return newUser.save().then(( user, err ) => {
//                 console.log(user)
//                 return {accessToken: auth.createAccessToken(user.toObject())}
//             })
//         }
//     } else {
//         return {err: 'google-auth-error'}
//     }
// }