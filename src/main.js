const express = require('express')

const { validateToken } = require('./middlewares/auth')
const { recordMetrics } = require('./middlewares/metrics')

class initialize {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.setUpHealthCheck()
        this.setUpMiddleWare()
        this.setUpRoutes()
        this.startServer()
    }

    setUpHealthCheck() {
        this.app.get('/health-check', async (req, res) => {
            return res.status(200).send({
                status: 'Ok',
                version: require('../package.json').version,
                message: 'Gateway is up.'
            })
        })
    }
 
    setUpMiddleWare() {
        // used for metrices
        this.app.use(recordMetrics)
        // authentication
        this.app.use(validateToken)
        // rate-limiter
    }

    setUpRoutes() {
        this.app.get('/test', () => { return res.status(200).send({}) })
    }

    startServer() {
        const PORT = process.env.GATEWAY_PORT || 8000
        this.app.listen(PORT, (err) => {
            if(err) throw err
            console.log('Application Gateway running on ' + PORT)
        })
    }
}

module.exports = {
    start: initialize
}