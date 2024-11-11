const cloudinary = require("../config/cloudinary") // Adjust path as needed

const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto", // This allows all file types, e.g., images, videos
    })
    return { url: result.secure_url, public_id: result.public_id }
  } catch (error) {
    throw new Error("Cloudinary upload failed")
  }
}

module.exports = { uploadToCloudinary }
