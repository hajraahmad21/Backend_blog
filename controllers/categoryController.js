const asyncHandler = require("express-async-handler");
const Category = require("../models/Category/Category");

const CategoryController = {
  createCategory: asyncHandler(async (req, res) => {
    const { categoryName , description} = req.body;
    const categoryFound = await Category.findOne({ categoryName });
    if (categoryFound) throw new Error("Category already exists");

    const categoryCreated = await Category.create({categoryName, author: req.user, description});
    if (categoryName) {
      res.send({
        status: "success",
        message: "Category created successfully",
        categoryCreated,
      });
    }
  }),
  getAllCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find({ author: req.user });
    res.send({
      status: "success",
      message: "Categories fetched successfully",
      categories,
    });
  }),
  getCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) throw new Error("Category not found");
    res.send({
      status: "success",
      message: "Category fetched successfully",
      category,
    });
  }),
  updateCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { categoryName, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { categoryName, description }, { new: true });
    if (!updatedCategory) throw new Error("Category not found");
    res.send({
      status: "success",
      message: "Category updated successfully",
      updatedCategory,
    });
  }),
  deleteCategory: asyncHandler(async (req, res) => {
    const {id} = req.params;
    const categoryFound = await Category.findById(id);
    if (!categoryFound) throw new Error("Category not found");
    const categoryDeleted = await Category.findByIdAndDelete(id);
    res.send({
      status: "success",
      message: "Category deleted successfully",
      categoryDeleted,
    });
  }),
};
module.exports = CategoryController;
