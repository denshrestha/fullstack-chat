const setError = require('../../responces/setError')
const setResponse = require('../../responces/setReponse')
const User = require('../../resources/user')

module.exports = async (req, res, next) => {
  const id = req.params.id
  const user = await User.findOne({_id: id})
  const friendsData = [...user.friends]
  let friendsList = []
  for (const friendId of friendsData) {
    const friend = await User.findOne({_id: friendId})
    friendsList.push(friend)
  }
  if(friendsList.length) {
    setResponse(res, [...friendsList])
  }
  setError(res, {status: 203, message: 'No users found'})
}
