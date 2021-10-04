const EventEmitter = require('events');
const emitter = new EventEmitter();
const setError = require('../responces/setError')
const setResponse = require("../responces/setReponse")
const User = require('../resources/user')
const Chat = require("../resources/chat");

const createUsersChat = async (userID, friendID) => {
  return  await Chat.create({
    peers: [userID,friendID]
  })
}

const updateUsersChat = async (userID, friendID, chatID) => {
  const currUser = await User.findOne({_id: userID})
  const friend =  await User.findOne({_id: friendID})
  let userChat = [...currUser.conversations]
  let friendChat = [...friend.conversations]
  userChat.push(chatID)
  friendChat.push(chatID)
  await User.updateOne({_id: userID}, {conversations: userChat})
  await User.updateOne({_id: friendID}, {conversations: friendChat})
}

const updateFriendList = async (user, newFriend) => {
  const friends = [...user.friends]
  friends.push(newFriend)
  await User.updateOne({_id: user.id}, {friends: friends})
}

const deleteCurrentRequest = async (user, requestId) => {
  const requests = [...user.requests]
  requests.splice(requestId, 1)
  await User.updateOne({_id: user.id}, {requests: requests})
}

module.exports = {
  create: async (req, res, next) => {
    const {
      fullName,
      birthDate,
      age,
      email,
      password,
      online = false
    } = req.body;
    const { path } = req.file
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const newUser = await User.create({
      fullName: fullName,
      birthDate: birthDate,
      age: age,
      email: email,
      password: password,
      avatar: path,
      online: online,
    })

    if(newUser){
      req.isCreated = true
      next()
    }
    setError(res, {status: 403, message: 'Oops! Something went wrong...'})
  },
  acceptFriendship: async (req, res, next) => {
    const {CurrentUserId, requestId} = req.body
    const currUser = await User.findOne({_id: CurrentUserId})
    const user = await User.findOne({_id: requestId})
    const index = currUser.requests.findIndex((i) => i.id === requestId)
    if(index > -1) {
      try {
        await updateFriendList(currUser, user.id)
        await updateFriendList(user, currUser.id)
        await deleteCurrentRequest(currUser, index)
        const newChat = await createUsersChat(currUser.id, user.id)
        await updateUsersChat(currUser, user.id, newChat.id)
      } catch (e) {
        console.log('ERROR', e)
        setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
      }
      setResponse(res, {message: 'User successfully added to your friends!', userID: user.id})
    } else {
      setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
    }
  },
  declineFriendship: async (req, res, next) => {
    const {CurrentUserId, requestId} = req.body
    const currUser = await User.findOne({_id: CurrentUserId})
    const index = currUser.requests.findIndex((i) => i.id === requestId)
    if(index > -1) {
      try {
        await deleteCurrentRequest(currUser, index)
      } catch (e) {
        setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
      }
      setResponse(res, {message: 'Request declined'})
    } else {
      setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
    }
  },

  getFriends: async (req, res, next) => {
    const id = req.params.id
    const user = await User.findOne({_id: id})
    const friendsData = [...user.friends] || []
    let friendsList = []
    for (const friendId of friendsData) {
      const friend = await User.findOne({_id: friendId})
      friendsList.push(friend)
    }
    if(friendsList.length) {
      setResponse(res, [...friendsList])
    }
    setError(res, {status: 203, message: 'No users found'})
  },
  getUser: async (req, res, next) => {
    const {email, password = ''} = req.body;
    const user = await User.findOne({email: email})
    if(user){
      if(password) {
        if(user.password === password){
          await User.updateOne({email: email}, {online: true})
          req.user = await User.findOne({email: email})
          next()
        } else {
          setError(res, {status: 403, message: 'Wrong password'})
        }
      } else {
        await User.updateOne({email: email}, {online: true})
        req.user = await User.findOne({email: email})
        next()
      }
    } else {
      setError(res, {status: 404, message: 'User not found. Please check email.'})
    }
    next()
  },
  getUserInfo: async (req, res, next) => {
    const id = req.verifyedUser
    const user = await User.findOne({_id: id})
    if(user){
      setResponse(res, user)
    }
    setError(res, {status: 404, message: 'User not found. Please try to login'})
  },
  searchUsers: async (req, res, next) => {
    const regExp = new RegExp(".*" + req.params.id + ".*", 'i');
    const users = await User.find({'fullName': {$regex: regExp}})
    req.users = [...users]
    if( req.users.length ) {
      setResponse(res, req.users)
    } else {
      setError(res, {status: 203, message: 'No matches found'})
    }
  },
  sendFriendshipRequest: async (req, res, next) => {
    const userId = req.verifyedUser
    const {id} = req.body
    const currUser = await User.findOne({_id: userId})
    const user = await User.findOne({_id: id})
    if(user && currUser) {
      const simpleDataOfRequestSender = {
        id: currUser.id,
        fullName: currUser.fullName,
        avatar: currUser.avatar
      }
      let requests = [...user.requests]
      const requestIndex = requests.findIndex((i) => i.id === simpleDataOfRequestSender.id)
      if(requestIndex > -1){
        setResponse(res, {color: 'secondary', message: 'Request to this user was already sent. No confirmation yet.'})
      } else {
        requests.push(simpleDataOfRequestSender)
        await User.updateOne({_id: id}, {requests: requests})
        setResponse(res, {color: 'success', message: `Request to ${user.fullName} has been sent`})
      }
    } else {
      setResponse(res, {color: 'error', message: 'User not found. Or something went wrong. Please try one more time.'})
    }
  },
  updateOnlineStatus: async (req, res, next) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id})
    if (user) {
      await User.updateOne({_id: id}, {online: false})
      next()
    } else {
      setError(res, {status: 403, message: 'Error! Wrong data provided!'})
    }
  },
  openUserProfile: async (req, res, next) => {
    const {id} = req.params
    const user = await User.findOne({_id: id})
    if (user) {
      setResponse(res, {user: user})
    } else {
      setError(res, {status: 403, message: 'Error! No user found'})
    }
  }
}
