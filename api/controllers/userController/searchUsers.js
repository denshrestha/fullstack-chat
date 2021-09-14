const User = require('../resources/user')
const setError = require("../responces/setError");
const setResponse = require("../responces/setReponse");

module.exports = async (req, res, next) => {
  const regExp = new RegExp(".*" + req.params.id + ".*", 'i');
  const users = await User.find({'fullName': {$regex: regExp}})
  req.users = [...users]
  if( req.users.length ) {
    setResponse(res, req.users)
  } else {
    setError(res, {status: 404, message: 'No matches found'})
  }
}
