const jwt = require("jsonwebtoken");
// Generate JWT
exports.generateToken = (id) => {
  return jwt.sign({ id }, "a1b2c3", { expiresIn: "1h" });
};
