const { vehicleSchema, Vehicle } = require('./vehicle');
const {bookingSchema}= require('./booking');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const insuranceSchema = Schema({
  insuranceType: {type: String, required: true},
  booking: [bookingSchema],
  Vehicle: [vehicleSchema]
})

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = { Insurance, insuranceSchema };