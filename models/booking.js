const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    totalPrice: { type: Number, required: false },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected", "Completed"],
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
