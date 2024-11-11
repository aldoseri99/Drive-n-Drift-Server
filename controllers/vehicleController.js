const { Vehicle } = require("../models")
const { uploadToCloudinary } = require("./uploadHelper") // Adjust path as needed

const GetVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({})
    res.send(vehicles)
  } catch (error) {
    throw error
  }
}

const CreateVehicle = async (req, res) => {
  const { brand, model, description, color, category, price, image } = req.body

  try {
    let imageData = {}

    if (image) {
      imageData = await uploadToCloudinary(image, "vehicles")
      console.log("Image data from Cloudinary:", imageData)
    }

    // Create a new vehicle entry in the database with image data
    const vehicle = await Vehicle.create({
      brand,
      model,
      description,
      color,
      category,
      price,
      image: {
        url: imageData.url,
        publicId: imageData.public_id,
      },
    })

    res.status(201).json(vehicle)
  } catch (error) {
    console.error("Error creating vehicle:", error)
    res
      .status(500)
      .json({ error: "An error occurred while creating the vehicle." })
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
