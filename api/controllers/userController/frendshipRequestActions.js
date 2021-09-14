const setError = require('../../responces/setError')
const setResponse = require('../../responces/setReponse')
const User = require('../../resources/user')

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
  accept: async (req, res, next) => {
    const {CurrentUserId, requestId} = req.body
    const currUser = await User.findOne({_id: CurrentUserId})
    const user = await User.findOne({_id: requestId})
    const index = currUser.requests.findIndex((i) => i.id === requestId)
    if(index > -1) {
      try {
        await updateFriendList(currUser, user.id)
        await deleteCurrentRequest(currUser, index)
        await updateFriendList(user, currUser.id)
      } catch (e) {
        console.log('ERROR', e)
        setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
      }
      setResponse(res, {message: 'User successfully added to your friends!'})
    } else {
      setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
    }
  },
  decline: async (req, res, next) => {
    const {CurrentUserId, requestId} = req.body
    const currUser = await User.findOne({_id: CurrentUserId})
    const user = await User.findOne({_id: requestId})
    const index = currUser.requests.findIndex((i) => i === requestId)
    if(index > -1) {
      try {
        await deleteCurrentRequest(currUser, index)
      } catch (e) {
        console.log('ERROR', e)
        setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
      }
      setResponse(res, {message: 'Request declined'})
    } else {
      setError(res, {status: 203, message: 'Some error is appeared. Look into the code'})
    }
  },
}
