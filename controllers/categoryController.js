const Category = require('../models/category')
const { uploadToCloudinary } = require('./uploadHelper') // Adjust path as needed

const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.send(categories)
  } catch (error) {
    throw error
  }
}

const CreateCategory = async (req, res) => {
  const { name, image } = req.body

  try {
    let imageData = {}

    if (image) {
      imageData = await uploadToCloudinary(image, 'categories')
      console.log('Image data from Cloudinary:', imageData)
    }

    // Create a new vehicle entry in the database with image data
    const category = await Category.create({
      name,
      image: {
        url: imageData.url,
        publicId: imageData.public_id
      }
    })

    res.status(201).json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while creating the category.' })
  }
}

const DetailCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.category_id })
    console.log(category)

    res.send(category)
  } catch (error) {
    throw error
  }
}
const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      {
        _id: req.params.category_id
      },
      { ...req.body }
    )
    console.log(category)

    res.send(category)
  } catch (error) {}
}

const DeleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.category_id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCategories,
  CreateCategory,
  DetailCategory,
  UpdateCategory,
  DeleteCategory
}
