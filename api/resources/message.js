const mongoose = require('mongoose')
const messageSchema = require('./definitions/messages')

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("message", messageSchema);
