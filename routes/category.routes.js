const express = require("express");
const routes = express.Router();
const CategoryController = require("../controller/category.controller");

routes.get("/createCategory", CategoryController.createCategory);
routes.get("/getAllCategories", CategoryController.getAllCategories);

module.exports = routes;
