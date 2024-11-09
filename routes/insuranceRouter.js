const express = require("express")
const router = express.Router()
const insuranceController = require("../controllers/insuranceController")

router.get("/", insuranceController.GetInsurances)
router.post("/", insuranceController.CreateInsurance)
router.get("/:insurance_id", insuranceController.InsuranceDetail)
router.put("/:insurance_id", insuranceController.UpdateInsurance)
router.delete("/:insurance_id", insuranceController.DeleteInsurance)

module.exports = router
