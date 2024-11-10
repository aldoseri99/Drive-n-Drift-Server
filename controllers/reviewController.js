const { Review } = require("../models")
const { Booking } = require("../models")

const GetReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
    res.send(reviews)
  } catch (error) {
    throw error
  }
}

const CreateReview = async (req, res) => {
  try {
    const bookingExist = await Booking.findOne({
      user: req.body.user,
      vehicle: req.body.vehicle,
    })
    // console.log(bookingExist)

    if (bookingExist) {
      const review = await Review.create({ ...req.body })
      res.status(201).send(review)
    } else {
      res.status(403).send({
        message:
          "Review not allowed. User must have a valid booking for this vehicle.",
      })
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error: error.message })
  }
}

const ReviewDetail = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.review_id })
    res.send(review)
  } catch (error) {}
}
const UpdateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      { _id: req.params.review_id },
      { ...req.body }
    )
    res.send(review)
  } catch (error) {}
}

const DeleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.review_id })
    res.send({ msg: "Post Deleted", payload: req.params.post_id, status: "Ok" })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetReviews,
  CreateReview,
  ReviewDetail,
  UpdateReview,
  DeleteReview,
}
