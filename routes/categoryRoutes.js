const express = require("express");

const {
  getAllCategoriesController,
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryController);
router.post("/", createCategoryController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategory);

module.exports = router;
