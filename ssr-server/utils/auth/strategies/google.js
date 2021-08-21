const passport = require('passport')
const {OAuth2Strategy} = require('passport-google-oauth')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const boom = require("@hapi/boom")
const {config} = require('../../../config')
const axios = require('axios')
passport.use(new GoogleStrategy({
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, cb){
        console.log(profile)
        const {data, status} = await axios({
            url:`${config.apiUrl}/api/auth/sign-provider`,
            method:'post',
            data:{
                name: profile._json.name,
                email: profile._json.email,
                password: profile.id,
                apiKeyToken: config.apiKeyToken
            }
        }) 
        if(!data || status !== 200){
            return cb(boom.unauthorized(), false)
        }

        return cb(null, data)
    })

)