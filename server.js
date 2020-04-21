const express = require('express')

// router imports

const projectRouter = require('./routers/projectRouter')

const actionRouter = require('./routers/actionRouter')

const server = express();

server.use(express.json())

// use routers

server.use('/projects', projectRouter)

server.use('/actions', actionRouter)


module.exports = server
