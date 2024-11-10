const mongoose = require("mongoose")

const insuranceSchema = new mongoose.Schema(
  {
    insuranceType: { type: String, required: true },
    price: { type: Number, required: true },
    termsAndConditions: { type: String },
  },
  { timestamps: true }
)

const Insurance = mongoose.model("Insurance", insuranceSchema)

module.exports = { Insurance, insuranceSchema }
