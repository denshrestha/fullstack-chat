const setError = require('../responces/setError')
const User = require('../resources/user')

module.exports = async (req, res, next) => {
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
}
