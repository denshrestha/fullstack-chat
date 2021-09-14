const setError = require('../responces/setError')
const User = require('../resources/user')

module.exports = async (req, res, next) => {
  const {email} = req.body;
  const user = await User.findOne({email: email})
  if(user){
      await User.updateOne({email: email}, {online: false})
      req.isLoggedOut = true
      next()
  } else {
    setError(res, {status: 403, message: 'Error! Wrong data provided!'})
  }
}
