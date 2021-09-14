const setError = require('../../responces/setError')
const setResponse = require('../../responces/setReponse')
const User = require('../../resources/user')

module.exports = async (req, res, next) => {
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
      setError(res, {status: 203, message: 'Request to this user was already sent. No confirmation yet.'})
    } else {
      requests.push(simpleDataOfRequestSender)
      await User.updateOne({_id: id}, {requests: requests})
      setResponse(res, {message: 'Request has been sent!'})
    }
  } else {
    setError(res, {status: 203, message: 'User not found. Or something went wrong. Please try one more time.'})
  }
}
