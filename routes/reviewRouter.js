const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.get('/', reviewController.GetReviews)
router.post('/', reviewController.CreateReview)
router.delete('/:review_id', reviewController.DeleteReview)

module.exports = router