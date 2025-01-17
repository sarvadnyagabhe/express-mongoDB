const express = require("express");
const routes = express.Router();
const ProductController = require("../controller/product.controller");

routes.post("/createProduct", ProductController.createProduct);
routes.get("/getAllProducts", ProductController.getAllProducts);
routes.get("/getProductById", ProductController.getProductById);
routes.delete("/deleteProduct/:id", ProductController.deleteProduct);

module.exports = routes;
