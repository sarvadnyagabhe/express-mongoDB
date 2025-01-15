const mongoose = require("mongoose");
const Category = require("./category.model");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category, // Reference to the Category model
      required: [true, "Product Category is required."],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
