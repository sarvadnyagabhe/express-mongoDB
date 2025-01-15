const User = require("../models/user.model");

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
