module.exports = (res, data, token) => {
  return  token ? res.json({data: data, token: token}) : res.json({data: data})
}
