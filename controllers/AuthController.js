const User = require("../models/User")
const middleware = require("../middleware")

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password, name, username } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    let existingUsername = await User.findOne({ username })
    if (existingUser) {
      return res.send({
        message: "A user with that email has already been registered!",
      })
    } else if (existingUsername) {
      return res.send({
        message: "A user with that username has already been registered!",
      })
    } else {
      const user = await User.create({
        name,
        email,
        passwordDigest,
        username,
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
      }
      let token = middleware.createToken(payload)

      return res.send({
        user: payload,
        token,
      })
    } else {
      return res.send({
        message: "Incorrect password!",
      })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "An error has occurred!" })
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
        followings: user.followings,
        profilePic: user.profilePic,
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
    const { name } = req.body

    let user = await User.findByIdAndUpdate(req.params.user_id, { name })

    let payload = {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
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

module.exports = {
  Register,
  Login,
  UpdateUser,
  UpdatePassword,
}
