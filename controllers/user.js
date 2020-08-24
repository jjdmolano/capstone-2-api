const User = require('../models/user')
const {OAuth2Client, auth} = require('google-auth-library')

module.exports.verifyGoogleTokenId = async(tokenId) => {
    const client = new OAuth2Client(clientId)
    const data = await client.verifyIdToken({ idToken: tokenId, audience: clientId })

    if(data.payload.email_verified) {
        const user = await (await User.findOne({email: data.payload.email})).exec()
        if(user != null) {
            return user.loginType === 'google'
            ? {accessToken: auth.createAccessToken(user.toObject())}
            : {error: 'login-type-error'}
        } else {
            const newUser = new User ({
                firstName: data.payload.given_name,
                lastName: data.payload.family_name,
                email: data.payload.email
            })

            return newUser.save().then(( user, err ) => {
                console.log(user)
                return {accessToken: auth.createAccessToken(user.toObject())}
            })
        }
    } else {
        return {err: 'google-auth-error'}
    }
}