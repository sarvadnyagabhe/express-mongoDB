const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");

//load env variables
dotenv.config();

//connect to MongoDB
connectDB();

const app = express();

//middleware
app.use(bodyParser.json());

//routes
app.use("/api", userRoutes, categoryRoutes, productRoutes);

//sample route
app.get("/", (req, res) => {
  res.send("API is running..");
});

// //user routes
// app.post("/api/CreateUsers", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = new User({ name, email, password });
//     await user.save();
//     return res
//       .status(201)
//       .json({ success: true, message: "New user created", user: user });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

// //get all users
// app.get("/api/getAllUser", async (req, res) => {
//   try {
//     const allUsers = await User.find();
//     return res.status(200).json({
//       success: true,
//       message: "Successfully fetch all users",
//       data: allUsers,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

//category routes
// //create category
// app.post("/api/createCategory", async (req, res) => {
//   const { name, description } = req.body;
//   try {
//     const category = new Category(req.body);

//     const savedCategory = await category.save();

//     return res.status(201).json({
//       success: true,
//       message: "New category added.",
//       data: savedCategory,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

// //get list of category
// app.get("/api/getAllCategory", async (req, res) => {
//   const AllCategories = await Category.find();
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Successfully fetch all categories.",
//       data: AllCategories,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, error: error.message });
//   }
// });

//product route
// //to add new product
// app.post("/api/createProduct", async (req, res) => {
//   const { name, price, category, description } = req.body;
//   try {
//     const categoryExists = await Category.findById(category);
//     if (!categoryExists) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }

//     const product = new Product(req.body);
//     const savedProduct = await product.save();

//     res.status(201).json({
//       success: true,
//       message: "New product added",
//       data: savedProduct,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

// //to get product list
// app.get("/api/getAllProduct", async (req, res) => {
//   try {
//     const products = await Product.find().populate("category"); // it will fetch all products details with category details
//     res.status(200).json({
//       success: true,
//       message: "Successfully fetch all products",
//       data: products,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

//start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
