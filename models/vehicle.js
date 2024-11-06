const mongoose = require('mongoose')
const { Schema } = mongoose

const vehicleSchema = new Schema({
  brand: { type: String },
  model: { type: String },
  description: { type: String },
  color: { type:String },
  category: { type: String },
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = {Vehicle, vehicleSchema}