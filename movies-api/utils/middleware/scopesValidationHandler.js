const boom = require('@hapi/boom')

function scopesValidationHandler(allowedScope){
    return function(req, res, next){
        if(!req.user || (req.user && !req.user.scopes)){
            next(boom.unauthorized('Missing allowed scopes'))
        }

        const hasAccess = allowedScope.map(scope => req.user.scopes.includes(scope))
        .find(allowed=>Boolean(allowed))

        if(hasAccess){
            next()
        } else {
           next(boom.unauthorized('Insufficient scopes'))
        }
    }
}

module.exports= scopesValidationHandler