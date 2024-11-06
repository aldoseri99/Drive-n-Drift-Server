const express = require('express')
const router = express.Router()
const vehicleController = require('../controllers/vehicleController')

router.get('/', vehicleController.GetVehicles)
router.post('/', vehicleController.CreateVehicle)
router.delete('/:vehicle_id', vehicleController.DeleteVehicle)

module.exports = router