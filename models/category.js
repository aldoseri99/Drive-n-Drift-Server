const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema(
  {
    name: { type: String },
    image: {
      publicId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
