const express = require("express")
const router = express.Router()
const vehicleController = require("../controllers/vehicleController")

router.get("/", vehicleController.GetVehicles) // All Vehicles
router.post("/", vehicleController.CreateVehicle) // Create Vehicle
router.get("/:vehicle_id", vehicleController.DetailVehicle) // Vehicle Detail
router.put("/:vehicle_id", vehicleController.UpdateVehicle) // Update Vehicle
router.delete("/:vehicle_id", vehicleController.DeleteVehicle) // Delete Vehicle

module.exports = router
