const { Router } = require('express')
const verifyToken = require('../helpers/verifyToken')
const setResponse = require('../responces/setReponse')
const {findChatHistory} = require('../controllers/messages/messageController')

const routerMessages = Router()

routerMessages.get('/messages/getMessages/:id', verifyToken, findChatHistory, (req, res, next) => {})

module.exports = routerMessages
