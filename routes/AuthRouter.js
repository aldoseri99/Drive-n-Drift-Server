const router = require("express").Router()
const controller = require("../controllers/AuthController")
const middleware = require("../middleware")

router.post("/register", controller.Register)
router.post("/signIn", controller.Login)
router.get("/user/:user_id", controller.GetUserInfo)
router.get("/users/:user_id", controller.GetAllUsers)
router.put("/update/:user_id", controller.UpdateUser)
router.put("/updatePass/:user_id", controller.UpdatePassword)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
