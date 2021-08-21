const passport = require('passport')
const {Strategy: FacebookStrategy} = require('passport-facebook')
const axios = require('axios')
const boom = require('@hapi/boom')

const {config} = require('../../../config')

passport.use(new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret : config.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ["name","emails"]
},
async function(accessToken, refreshToken, profile, cb){
    console.log(profile)
    const {data, status} = await axios({
        url: `${config.apiUrl}/api/auth/sign-provider`,
        method: "post",
        data:{
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            password: profile.id,
            apiKeyToken:config.apiKeyToken
        }
    })
    if(!data || status !== 200){
        return cb(boom.unauthorized(), false)
    }

    return cb(null, data)
}))