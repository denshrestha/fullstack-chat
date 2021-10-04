const mongoose = require('mongoose')
const {Timestamp} = require("mongodb");

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId, auto: true},
  text: {
    type: String,
    required: true
  },
  ChatID: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Number,
    required: true
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false
  }
})
