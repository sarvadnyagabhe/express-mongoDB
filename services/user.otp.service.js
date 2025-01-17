const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 for TLS or 465 for SSL
  secure: false, // Use false for TLS, true for SSL
  auth: {
    user: "sarvadnyagabhe@gmail.com",
    pass: "msom flsq jjbj xcau",
  },
});

exports.sendOTPEmail = async (email, otp) => {
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
