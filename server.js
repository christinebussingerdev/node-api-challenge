const express = require('express')
const cors = require('CORS')
// import routers
const projectRouter = require('./data/helpers/projectRouter')

//server init
const server = express()
server.use(express.json())
server.use(cors())
