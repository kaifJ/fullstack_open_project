const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        let token = authorization.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken.id) {
            next({
                name: 'JsonWebTokenError',
                message: 'invalid token'
            })
        }
        else request.userId = decodedToken.id
    }

    next()
}

module.exports = userExtractor