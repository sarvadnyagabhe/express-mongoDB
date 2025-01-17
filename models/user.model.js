const mongoose = require("mongoose");

//create schema
const CreateUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//login schema
const LoginCreateUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    otp: { type: Number, required: true },
  },
  { timestamps: true }
);

//otp schema
const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    otp: { type: Number, required: true },
  },
  { timestamps: true }
);

// Export Models
module.exports = {
  User: mongoose.model("User", CreateUserSchema),
  LoginUser: mongoose.model("LoginUser", LoginCreateUserSchema),
  OtpModel: mongoose.model("OtpModel", OtpSchema),
};
