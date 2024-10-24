const express = require('express');
const categoryRouter = express.Router()
const categoryController = require("../../controllers/categoryController")
const isAuthenticated = require("../../middlewares/isAuthenticated")

categoryRouter.post("/create",isAuthenticated, categoryController.createCategory);
categoryRouter.get("",isAuthenticated, categoryController.getAllCategories);
categoryRouter.get("/:id",isAuthenticated, categoryController.getCategory);
categoryRouter.delete("/:id",isAuthenticated, categoryController.deleteCategory);
categoryRouter.put("/:id",isAuthenticated, categoryController.updateCategory);
module.exports = categoryRouter
