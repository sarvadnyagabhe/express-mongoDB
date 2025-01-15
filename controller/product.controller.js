const Category = require("../models/category.model");
const Product = require("../models/product.model");

//add new product
exports.createProduct = async (req, res) => {
  const { name, price, category, description } = req.body;
  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "New product added",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//to get product list
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // it will fetch all products details with category details
    res.status(200).json({
      success: true,
      message: "Successfully fetch all products",
      data: products,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
