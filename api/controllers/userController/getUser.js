const setError = require('../../responces/setError')
const User = require('../../resources/user')

module.exports = async (req, res, next) => {
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
}
