const { Booking, Insurance } = require("../models")
const nodemailer = require("nodemailer")
require("dotenv").config()

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
    console.log(booking)

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
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
})
const sendAutoReplyEmail = async (emails, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: emails,
    subject: subject,
    text: text,
    html: html,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent:", info.response)
  } catch (error) {
    console.log("Error sending email", error)
  }
}

const SendEmail = async (req, res) => {
  try {
    const { name, emails } = req.body
    const subject = "Booking Confirmation"
    const text = `Dear ${name},\n\nYour booking is currently pending. If you have any questions or need further assistance, please don't hesitate to contact us at your convenience.\n\nBest regards,\Drive & Drift`

    if (!emails || !subject || !text) {
      return res.status(400).send("Missing required fields")
    }
    await sendAutoReplyEmail(emails, subject, text)
    res.status(200).send("Email has been sent")
  } catch (error) {
    throw error
  }
}
const sendStatus = async (req, res) => {
  try {
    const { name, emails, status } = req.body
    console.log(req.body)

    const subject = `Booking Status Update`

    let statusMessage
    switch (status) {
      case "Pending":
        statusMessage = "Your booking is currently pending."
        break
      case "Confirmed":
        statusMessage = "Your booking has been confirmed!"
        break
      case "Rejected":
        statusMessage = "Unfortunately, your booking has been rejected."
        break
      case "Completed":
        statusMessage = "Your booking has been completed."
        break
      default:
        statusMessage = "We are unable to determine your booking status."
    }

    const text = `Dear ${name},\n\n${statusMessage} If you have any questions or need further assistance, please don't hesitate to contact us at your convenience.\n\nBest regards,\Drive & Drift`

    const html = `
    <html>
      <body>
        <h2>Booking Status Update</h2>
        <img src="https://res.cloudinary.com/drd89nnxf/image/upload/v1731531530/gm04joq2sem6upt5ipbp.png" alt="Company Logo" style="max-width: 150px; max-height: 150px; margin-bottom: 20px; border-radius:50%;">
        <p>Dear ${name},</p>
        <p>${statusMessage}</p>
        <p>If you have any questions or need further assistance, please don't hesitate to contact us at your convenience.</p>
        <br>
        <p>Best regards,</p>
        <p>Drive & Drift</p>
      </body>
    </html>
  `

    if (!emails || !subject || !html) {
      return res.status(400).send("Missing required fields")
    }
    await sendAutoReplyEmail(emails, subject, text, html)
    res.status(200).send("Email has been sent")
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
  sendStatus,
}
