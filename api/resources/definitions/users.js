const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, auto: true},
    email: {
      type: String,
      require: true,
      unique: true,
    },
    age: {
      type: Number,
      require: true
    },
    birthDate: {
      type: String,
      require: true
    },
    fullName: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
    },
    online: {
      type: Boolean,
      default: false
    },
    conversations: {
      type: [String],
      default: []
    },
    friends: {
      type: Array,
      default: []
    },
    avatar: {
      type: String,
      default: ''
    },
    requests: {
      type: Array,
      default: []
    }
  },
  {
    autoIndex: false,
  },
);

