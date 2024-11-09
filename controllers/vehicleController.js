const { Vehicle } = require("../models")

const GetVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
    res.send(vehicles)
  } catch (error) {
    throw error
  }
}

const CreateVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.create({ ...req.body })
    res.send(vehicles)
  } catch (error) {
    throw error
  }
}

const DetailVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicle_id })
    console.log(vehicle)

    res.send(vehicle)
  } catch (error) {
    throw error
  }
}
const UpdateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      {
        _id: req.params.vehicle_id,
      },
      { ...req.body }
    )
    console.log(vehicle)

    res.send(vehicle)
  } catch (error) {}
}

const DeleteVehicle = async (req, res) => {
  try {
    await Vehicle.deleteOne({ _id: req.params.vehicle_id })
    res.send({ msg: "Post Deleted", payload: req.params.post_id, status: "Ok" })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetVehicles,
  CreateVehicle,
  DetailVehicle,
  UpdateVehicle,
  DeleteVehicle,
}
