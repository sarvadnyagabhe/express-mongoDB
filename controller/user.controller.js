const { User } = require("../models/user.model");
const { otpGenerator } = require("../utils/otpGenerator");
const { sendOTPEmail } = require("../services/user.otp.service");

//create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "New user created", user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({
      success: true,
      message: "Successfully fetch all users",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//send OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email is required" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //utils to generate otp
    const randomOtp = otpGenerator();

    //service to send otp
    const emailSent = await sendOTPEmail(email, randomOtp);

    if (emailSent) {
      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
