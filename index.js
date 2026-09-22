require('dotenv').config()

const server = require('./src/main.js')

function validatingEnv() {
    const requireEnv = ['JWT_SECRET']
    requireEnv.map(env => {
        if(!process.env[env]) throw new Error(`Missing Env variable: ${env}`)
    })
}

function start() {
    validatingEnv()
    new server.start()
}

start()