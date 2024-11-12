const express = require("express")
const router = express.Router()
const categoryController = require("../controllers/categoryController")

router.get("/", categoryController.GetCategories) // All Categorys
router.post("/", categoryController.CreateCategory) // Create Category
router.get("/:category_id", categoryController.DetailCategory) // Category Detail
router.put("/:category_id", categoryController.UpdateCategory) // Update Category
router.delete("/:category_id", categoryController.DeleteCategory) // Delete Category

module.exports = router
