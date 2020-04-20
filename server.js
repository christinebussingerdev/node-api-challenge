const express = require('express')

// router imports

const server = express();

server.use(express.json())

// use routers

module.exports = server
