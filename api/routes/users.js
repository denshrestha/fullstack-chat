
const { Router } = require('express')
const verifyToken = require('../helpers/verifyToken')
const getUser = require('../controllers/userController/getUser')
const setResponse = require('../responces/setReponse')
const searchUsers = require('../controllers/userController/searchUsers')
const sendFriendshipRequest = require('../controllers/userController/sendFriendshipRequest')
const friendshipRequestActions = require('../controllers/userController/frendshipRequestActions')
const getFriends = require('../controllers/userController/getFriends')
const getUserInfo = require('../controllers/userController/getUserInfo')

const routerUsers = Router()
// const users = require('../users/index')

routerUsers.get('/user', verifyToken, getUserInfo, (req, res, next) => {})

routerUsers.get('/user/:id/friends', verifyToken, getFriends, (req, res, next) => {})

routerUsers.post('/user/request/friends', verifyToken, sendFriendshipRequest, (req, res, next) => {})

routerUsers.post('/user/request/friends/accept', verifyToken, friendshipRequestActions.accept, (req, res, next) => {})
routerUsers.post('/user/request/friends/decline', verifyToken, friendshipRequestActions.decline, (req, res, next) => {})

routerUsers.get('/users/search/:id', verifyToken, searchUsers, (req, res, next) => {})


module.exports = routerUsers
