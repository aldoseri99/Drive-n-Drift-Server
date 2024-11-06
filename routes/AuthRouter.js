const router = require("express").Router()
const controller = require("../controllers/AuthController")
const middleware = require("../middleware")

router.post("/register", controller.Register)
router.post("/login", controller.Login)
router.put("/update/:user_id", controller.UpdateUser)
router.put("/updatePass/:user_id", controller.UpdatePassword)

module.exports = router
