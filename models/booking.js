const { vehicleSchema, Vehicle } = require('./vehicle');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema({
  date: {type: Date, required: true},
  user: {type: Number, required: true},
  Vehicle: [vehicleSchema],
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking, bookingSchema };