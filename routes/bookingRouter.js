const express = require("express")
const router = express.Router()
const bookingController = require("../controllers/bookingController")

router.get("/", bookingController.GetBookings)
router.post("/", bookingController.CreateBooking)
router.get("/:booking_id", bookingController.BookingDetail)
router.put("/:booking_id", bookingController.UpdateBooking)
router.delete("/:booking_id", bookingController.DeleteBooking)
router.post("/autoEmail", bookingController.SendEmail)
router.post("/statusEmail", bookingController.sendStatus)

module.exports = router
