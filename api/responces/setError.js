module.exports = (res, {status, message}) => {
  return res.status(status).send({data: {message: message}})
}
