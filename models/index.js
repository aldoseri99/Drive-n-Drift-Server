const mongoose = require("mongoose")
const { Booking } = require("./booking")
const { Insurance } = require("./insurance")
const { Review } = require("./review")
const { Vehicle } = require("./vehicle")
const { User } = require("./User")
const { Category } = require("./category")

module.exports = {
  Booking,
  Insurance,
  Review,
  Vehicle,
  User,
  Category
}
