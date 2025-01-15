const express = require("express");
const routes = express.Router();
const UserController = require("../controller/user.controller");

routes.get("/createUser", UserController.createUser);
routes.get("/getAllUsers", UserController.getAllUsers);

module.exports = routes;
