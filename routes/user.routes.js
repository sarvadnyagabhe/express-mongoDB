const express = require("express");
const routes = express.Router();
const UserController = require("../controller/user.controller");

routes.post("/createUser", UserController.createUser);
routes.get("/getAllUsers", UserController.getAllUsers);
routes.post("/login", UserController.loginUser);
routes.post("/sendOtp", UserController.sendOTP);
routes.put("/updateUser/:id", UserController.updateUser);

module.exports = routes;
