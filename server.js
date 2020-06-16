const express = require('express')
const cors = require('CORS')
// import routers
const projectRouter = require('./data/helpers/projectRouter')
const actionRouter = require('./data/helpers/actionRouter')

//server init
const server = express()
server.use(express.json())
server.use(cors())

server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

module.exports = server
