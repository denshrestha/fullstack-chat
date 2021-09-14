const { Router } = require('express')
const uploadImage = require('../helpers/uploadImage')

const getUser = require('../controllers/userController/getUser')
const createUser = require('../controllers/userController/createUser')
const updateUserOnlineStatus = require('../controllers/userController/updateUserOnlineStatus')
const setResponse = require('../responces/setReponse')
const generateToken = require('../helpers/generateToken')
const routerAuth = Router()

routerAuth.post('/login', getUser, generateToken, (req, res, next) => {
  setResponse(res, req.user, req.token)
})

routerAuth.post('/register', uploadImage.single('avatar'), createUser, (req, res, next) => {
  setResponse(res, req.isCreated)
})

routerAuth.post('/logout', updateUserOnlineStatus, (req, res, next) => {
  setResponse(res, {message: 'User logged out'})
})
module.exports = routerAuth


