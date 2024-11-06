const express = require('express')
const router = express.Router()
const insuranceController = require('../controllers/insuranceController')

router.get('/', insuranceController.GetInsurances)
router.post('/', insuranceController.CreateInsurance)
router.delete('/:insurance_id', insuranceController.DeleteInsurance)

module.exports = router