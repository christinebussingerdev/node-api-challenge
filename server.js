const express = require('express')

// router imports

const projectRouter = require('./routers/projectRouter')

const server = express();

server.use(express.json())

// use routers

server.use('/projects', projectRouter)


module.exports = server
