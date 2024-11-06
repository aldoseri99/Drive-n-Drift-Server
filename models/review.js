const { vehicleSchema, Vehicle } = require('./vehicle');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new mongoose.Schema({
  review: {type: String, required: true},
  rating: {type: Number, required: true},
  Vehicle: [vehicleSchema]
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review, reviewSchema };