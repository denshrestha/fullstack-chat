module.exports = (status, err) => {
  return {
    status: status,
    data: {
      message: err
    }
  }
}
