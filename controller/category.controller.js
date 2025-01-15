const Category = require("../models/category.model");

//create category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = new Category(req.body);

    const savedCategory = await category.save();

    return res.status(201).json({
      success: true,
      message: "New category added.",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get list of category
exports.getAllCategories = async (req, res) => {
  const AllCategories = await Category.find();
  try {
    return res.status(200).json({
      success: true,
      message: "Successfully fetch all categories.",
      data: AllCategories,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
