const mongoose = require('mongoose')
const messages = require('./messages')

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId, auto: true},
  peers: {
    type: Array,
    require: true
  },
  message: {
    type: [messages],
    required: true,
    default: []
  }
})
