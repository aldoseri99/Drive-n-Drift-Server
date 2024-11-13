const User = require("../models/User")
const middleware = require("../middleware")
const { uploadToCloudinary } = require("./uploadHelper")

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password, name, username, image } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.send({
        message: "A user with that email has already been registered!",
      })
    } else {
      let imageData = {}
      if (image) {
        imageData = await uploadToCloudinary(image, "profile-pic")
        console.log("Image data from Cloudinary:", imageData)
      }
      console.log("Image data from Cloudinary:", imageData)
      const user = await User.create({
        name,
        email,
        passwordDigest,
        username,
        image: {
          url: imageData.url,
          publicId: imageData.public_id,
        },
        role: "customer",
      })
      // Sends the user as a response
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
      return res.send({
        message: "No user with that email or username was found!",
      })
    }
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image.url,
      }
      let token = middleware.createToken(payload)

      return res.send({
        user: payload,
        token,
      })
    } else {
      console.log("Incorrect password!")
      return res.send({
        message: "Incorrect password!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", message: "An error has occurred!" })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.user_id)
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest,
      })
      let payload = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image.url,
      }
      return res.send({ status: "Password Updated!", user: payload })
    }
    res
      .status(401)
      .send({ status: "Error", msg: "Old Password did not match!" })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating password!",
    })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { role } = req.body
    console.log(role)

    let user = await User.findByIdAndUpdate(req.params.user_id, { role })
    console.log(user)

    let payload = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image.url,
    }
    return res.send({ status: "User Updated!", user: payload })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating user info!",
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals

  res.send(payload)
}

const GetUserInfo = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.user_id })
    res.send({ user })
  } catch (error) {
    throw error
  }
}

const GetAllUsers = async (req, res) => {
  let users = await User.find({ _id: { $ne: req.params.user_id } })
  res.send({ users })
}

module.exports = {
  Register,
  Login,
  UpdateUser,
  UpdatePassword,
  CheckSession,
  GetUserInfo,
  GetAllUsers,
}
