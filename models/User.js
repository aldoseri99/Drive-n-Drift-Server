const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    passwordDigest: String,
    profilePic: String
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User