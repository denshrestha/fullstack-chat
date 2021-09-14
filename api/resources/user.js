const mongoose = require('mongoose')
const userSchema = require('./definitions/users')

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("user", userSchema);
