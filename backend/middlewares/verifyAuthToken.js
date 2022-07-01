const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.verifyAuthToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      name: "TokenMissingError",
      success: false,
      message: "something went wrong",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};
