const setError = require('../../responces/setError')
const User = require('../../resources/user')

module.exports = async (req, res, next) => {
  const {id} = req.body;
  const user = await User.findOne({_id: id})
  if(user){
      await User.updateOne({_id: id}, {online: false})
      next()
  } else {
    setError(res, {status: 403, message: 'Error! Wrong data provided!'})
  }
}
