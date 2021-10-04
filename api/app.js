const express = require('express')
const routerUsers = require("./routes/users");
const routerAuth = require("./routes/auth");
const routerMessages = require("./routes/chat")
const app = express()
const server = require('http').createServer(app);

app.use(express.json())
app.use('/uploads', express.static('./api/uploads/'))
app.use(express.urlencoded({ extended: false }))
app.use(routerUsers)
app.use(routerAuth)
app.use(routerMessages)

module.exports = server
