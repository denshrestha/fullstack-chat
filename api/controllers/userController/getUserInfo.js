const setError = require('../../responces/setError')
const setResponse = require('../../responces/setReponse')
const User = require('../../resources/user')

module.exports = async (req, res, next) => {
  const id = req.verifyedUser
  const user = await User.findOne({_id: id})
  if(user){
    setResponse(res, user)
  }
  setError(res, {status: 404, message: 'User not found. Please try to login'})
}
