const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  const token = req.headers["authorization"]
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(
      token.split(' ')[1],
      'heLloMAZAfAkkaAaaAaaaAAA'
    )
    if(decoded){
      const { user_id } = decoded
      req.verifyedUser = user_id
      next()
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}
