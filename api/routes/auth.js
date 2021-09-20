const { Router } = require('express')
const uploadImage = require('../helpers/uploadImage')
const setResponse = require('../responces/setReponse')
const generateToken = require('../helpers/generateToken')
const userController = require('../controllers/user')
const routerAuth = Router()

routerAuth.post('/login', userController.getUser, generateToken, (req, res, next) => {
  setResponse(res, req.user, req.token)
})

routerAuth.post('/register', uploadImage.single('avatar'), userController.create, (req, res, next) => {
  setResponse(res, req.isCreated)
})

routerAuth.post('/logout', userController.updateOnlineStatus, (req, res, next) => {
  setResponse(res, {message: 'User logged out'})
})
module.exports = routerAuth


