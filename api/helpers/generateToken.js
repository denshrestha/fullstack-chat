const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const {_id, email} = req.user || req.body
  req.token = jwt.sign(
    {user_id: _id, email},
    'heLloMAZAfAkkaAaaAaaaAAA',
    {
      expiresIn: "90d",
    })
  next()
}
