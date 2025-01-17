const { User } = require("../models/user.model");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");

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

    if (!email) {
      return res
        .status(404)
        .json({ success: false, message: "Email is required" });
    }

    const randomOtp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use 587 for TLS or 465 for SSL
      secure: false, // Use false for TLS, true for SSL
      auth: {
        user: "sarvadnyagabhe@gmail.com",
        pass: "msom flsq jjbj xcau",
      },
    });

    const sendOTPEmail = async (email, otp) => {
      try {
        const mailOptions = {
          from: "sarvadnyagabhe@gmail.com",
          to: email,
          subject: "OTP for verification",
          text: `Your OTP code is ${otp}`,
          html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:- ", info.response);
        console.log("otp:- ", otp);
        return true;
      } catch (error) {
        console.error("Error sending email:", error);
        return false;
      }
    };

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
