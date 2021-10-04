const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  socketId: {
    type: String,
    require: true
  },
  userId: {
    type: String,
    required: true,
  }
})
