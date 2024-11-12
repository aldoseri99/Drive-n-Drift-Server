const mongoose = require("mongoose")
const { Schema } = mongoose

const vehicleSchema = new Schema(
  {
    brand: { type: String },
    model: { type: String },
    description: { type: String },
    color: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    price: { type: Number },
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

const Vehicle = mongoose.model("Vehicle", vehicleSchema)

module.exports = { Vehicle, vehicleSchema }
