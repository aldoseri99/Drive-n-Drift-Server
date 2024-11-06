const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/bookingController')

router.get('/', bookingController.GetBookings)
router.post('/', bookingController.CreateBooking)
router.delete('/:booking_id', bookingController.DeleteBooking)

module.exports = router