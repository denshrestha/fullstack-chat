const mongoose = require('mongoose')
const chatSchema = require('./definitions/chats')

chatSchema.set('toObject', { virtuals: true });
chatSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("chat", chatSchema);
