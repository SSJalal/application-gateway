const jwt = require('jsonwebtoken')

function validateToken(req, res, next) {
    try {
        console.log('Validating token..')
        const authHeader = req.headers['authorization']
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(400).send({
            message: 'Invalid token or no token found',
        })

        const token = authHeader.split(' ')[1]
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedPayload

        next()
    } catch (error) {
        console.error('Inavlid request: ', error)
        return res.status(400).send({
            message: 'Failed to validate token',
            stack: error.message || error
        })
    }
}

module.exports = { validateToken }