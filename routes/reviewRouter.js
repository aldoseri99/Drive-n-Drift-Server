const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController")

router.get("/", reviewController.GetReviews)
router.post("/", reviewController.CreateReview)
router.get("/:review_id", reviewController.ReviewDetail)
router.put("/:review_id", reviewController.UpdateReview)
router.delete("/:review_id", reviewController.DeleteReview)

module.exports = router
