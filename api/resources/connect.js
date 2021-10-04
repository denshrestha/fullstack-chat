const mongoose = require('mongoose')
const connectSchema = require('./definitions/connect')

connectSchema.set('toObject', { virtuals: true });
connectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("connect", connectSchema);
