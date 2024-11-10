const mongoose = require("mongoose")
const { Booking } = require("./booking")
const { Insurance } = require("./insurance")
const { Review } = require("./review")
const { Vehicle } = require("./vehicle")
const { User } = require("./User")

module.exports = {
  Booking,
  Insurance,
  Review,
  Vehicle,
  User,
}
