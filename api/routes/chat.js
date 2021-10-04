const { Router } = require('express')
const verifyToken = require('../helpers/verifyToken')
const setResponse = require('../responces/setReponse')
const {findChatHistory, findChatId} = require('../controllers/messages')

const routerMessages = Router()

routerMessages.get('/chat/:id', verifyToken, findChatHistory, (req, res, next) => {})

routerMessages.get('/chat/:uId/:fId', verifyToken, findChatId, (req, res, next) => {})

module.exports = routerMessages
