const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        status: "fail",
        message: `User with email ${email} already exists`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(201).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({
        status: "fail",
        message: `User with email ${email} does not exist`,
      });
    }
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: err.message,
          });
        }
        res.json({ token });
        res.setHeader("token", "token");
      }
    );

    return res.status(200).json({
      status: "success",
      token,
      user: oldUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
