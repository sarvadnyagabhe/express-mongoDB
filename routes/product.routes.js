const express = require("express");
const routes = express.Router();
const ProductController = require("../controller/product.controller");

routes.get("/createProduct", ProductController.createProduct);
routes.get("/getAllProducts", ProductController.getAllProducts);

module.exports = routes;
