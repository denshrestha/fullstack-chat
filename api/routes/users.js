
const { Router } = require('express')
const verifyToken = require('../helpers/verifyToken')

const userController = require('../controllers/user')

const routerUsers = Router()

routerUsers.get('/user', verifyToken, userController.getUserInfo, (req, res, next) => {

})

routerUsers.get('/user/:id/friends', verifyToken, userController.getFriends, (req, res, next) => {})

routerUsers.post('/user/request/friends', verifyToken, userController.sendFriendshipRequest, (req, res, next) => {})

routerUsers.post('/user/request/friends/accept', verifyToken, userController.acceptFriendship, (req, res, next) => {})
routerUsers.post('/user/request/friends/decline', verifyToken, userController.declineFriendship, (req, res, next) => {})

routerUsers.get('/users/search/:id', verifyToken, userController.searchUsers, (req, res, next) => {})


module.exports = routerUsers
