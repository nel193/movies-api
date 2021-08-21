const passport = require('passport')
const {Strategy: LinkedinStrategy} = require('passport-linkedin-oauth2')
const boom = require('@hapi/boom')
const axios = require('axios')
const {get} = require('lodash')
const {config} = require('../../../config')

passport.use(new LinkedinStrategy({
    clientID: config.linkedinClientId,
    clientSecret: config.linkedinClientSecret,
    callbackURL: '/auth/linkedin/callback',
    scope:['r_emailaddress','r_liteprofile']
}, async function(accessToken, refreshToken, profile, cb){
console.log(profile)
    const {data, status} = await axios({
        url:`${config.apiUrl}/api/auth/sign-provider`,
        method: 'post',
        data:{
            name: profile.displayName,
            email:get(profile,"emails.0.value"),
            password:profile.id,
            apiKeyToken: config.apiKeyToken
        }
    })

    if(!data || status !== 200){
        return cb(boom.unauthorized(), false)
    }

    return cb(null, data)
}
))