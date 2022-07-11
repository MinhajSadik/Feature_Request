const jwt = require("jsonwebtoken"),
  User = require("../models/userModel");

exports.verifyAuthToken = async (req, res, next) => {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        name: "TokenInvalidError",
        success: false,
        message: `User with id ${decoded.id} not found`,
      });
    }
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
