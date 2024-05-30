const Product = require("../models/productModal");
const Category = require("../models/categoryModal");

const createProductController = async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;
  try {
    const isCategory = await Category.findById(category);
    if (!isCategory) {
      return res.status(400).json({ message: "Category Invaid" });
    }
    const newProduct = await Product.create({
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const getAllProductsController = async (req, res) => {
  const { categories } = req.query;
  let filteredCategory = {};
  if (categories) {
    filteredCategory = { category: categories.split(",") };
  }
  try {
    const products = await Product.find(filteredCategory);
    if (!products || products.length === 0) {
      return res.json({ message: "No products yet, create one" });
    }
    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const getProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    if (!product || product.length === 0) {
      return res.json({ message: "No product found" });
    }
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const updateProductController = async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;
  const { id } = req.params;
  try {
    const isCategory = await Category.findById(category);
    if (!isCategory) {
      return res.status(400).json({ message: "Category Invaid" });
    }
    const newProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      },
      { new: true }
    );
    if (!newProduct) {
      return res.status(400).json({ message: "No product found to update" });
    }
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "No product found" });
    }
    res.status(201).json({ message: "Product deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const productCountController = async (req, res) => {
  try {
    const productCount = await Product.countDocuments({});
    console.log(productCount);
    if (productCount === 0) {
      return res.status(404).json({ message: "No products available!" });
    }
    res.status(201).json({ productCount: productCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const isFeaturedController = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ isFeatured: true }).limit(+count);
    if (product === 0) {
      return res.status(404).json({ message: "No products available!" });
    }
    res.status(201).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  productCountController,
  isFeaturedController,
};
