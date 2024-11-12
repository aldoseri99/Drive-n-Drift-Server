const { Booking, Insurance } = require("../models")

const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user").populate("vehicle")

    res.send(bookings)
  } catch (error) {
    throw error
  }
}

const CreateBooking = async (req, res) => {
  try {
    const bookings = await Booking.create({ ...req.body })
    res.send(bookings)
  } catch (error) {
    throw error
  }
}

const BookingDetail = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.booking_id })
      .populate("user")
      .populate("vehicle")
    res.send(booking)
  } catch (error) {}
}

const UpdateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      { _id: req.params.booking_id },
      {
        ...req.body,
      }
    )
    res.send(booking)
  } catch (error) {}
}

const DeleteBooking = async (req, res) => {
  try {
    await Booking.deleteOne({ _id: req.params.booking_id })
    res.send({ msg: "Post Deleted", payload: req.params.post_id, status: "Ok" })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetBookings,
  CreateBooking,
  BookingDetail,
  UpdateBooking,
  DeleteBooking,
}
