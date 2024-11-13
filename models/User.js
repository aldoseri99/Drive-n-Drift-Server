const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    passwordDigest: String,
    role: String,
    phone: Number,
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
