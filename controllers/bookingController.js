const { Booking, Insurance } = require("../models")
const nodemailer = require('nodemailer')
require('dotenv').config()

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


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})
const sendAutoReplyEmail = async (emails, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: emails,
    subject: subject,
    text : text
  }
  console.log(process.env.EMAIL)
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)
  } catch (error) {
    console.log('error sending email', error)
  }
}
const SendEmail = async (req, res) => {
  try {
    const { emails} = req.body;
    const subject  = 'booking confirmation';
    const text='your booking has been confirmed';
    if (!emails || !subject || !text) {
      return res.status(400).send('Missing required fields')
    }
    await sendAutoReplyEmail(emails, subject, text)
    res.status(200).send('Email has been sent')
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetBookings,
  CreateBooking,
  SendEmail,
  BookingDetail,
  UpdateBooking,
  DeleteBooking,
}
