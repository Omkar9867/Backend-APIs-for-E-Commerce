const Category = require("../models/categoryModal");

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res
        .status(200)
        .json({ message: "No categories yet, maybe create one!" });
    }
    res.status(201).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error, success: false });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(200)
        .json({ message: "No category found for this id!" });
    }
    res.status(201).json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error, success: false });
  }
};

const createCategoryController = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const newCategory = await Category.create({
      name,
      icon,
      color,
    });
    await newCategory.save();
    if (!newCategory) {
      return res.status(404).json({ message: "Unable to create Category" });
    }
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      { new: true }
    );
    if (!category) {
      return res.status(400).json({ message: "No category found to update" });
    }
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(201).json({ message: "Category deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error,
      success: false,
    });
  }
};

module.exports = {
  getAllCategoriesController,
  getCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategory,
};
