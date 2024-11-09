const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
    insuranceId: { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  },
  { timestamps: true }
)

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = { Booking, bookingSchema }
