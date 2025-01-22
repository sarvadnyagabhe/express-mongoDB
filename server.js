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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
