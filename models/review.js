const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  },
  { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)

module.exports = { Review, reviewSchema }
