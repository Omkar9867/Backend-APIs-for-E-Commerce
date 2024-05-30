const express = require("express");
const {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  productCountController,
  isFeaturedController,
} = require("../controllers/productController");
const router = express.Router();

router.post("/", createProductController);
router.get("/", getAllProductsController);
router.get("/:id", getProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);
router.get("/get-count", productCountController);
// router.get("/get-featured", isFeaturedController);
router.get("/get-featured/:count?", isFeaturedController);

module.exports = router;
