const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
