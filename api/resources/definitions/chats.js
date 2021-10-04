const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId, auto: true},
  peers: {
    type: Array,
    require: true
  },
})
