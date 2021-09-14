const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  author: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Number,
    default: null
  }
})
