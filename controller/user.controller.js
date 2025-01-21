const { User } = require("../models/user.model");
const { generateOTP } = require("../utils/otpGenerator");
const { sendOTPEmail } = require("../services/user.otp.service");
const { generateToken } = require("../utils/tokenGenerator");
const bcrypt = require("bcryptjs");

//create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPassword });

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

//update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = await User.findById(id);
    return res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

//user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    const user = await User.findOne({ email });
    console.log("new token==>", await bcrypt.compare(password, user.password));

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        success: true,
        message: "User login successfully",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user.id),
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
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
    const randomOtp = generateOTP();

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

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    console.log("==>", deletedUser);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
