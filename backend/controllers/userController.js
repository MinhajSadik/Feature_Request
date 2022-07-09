const User = require("../models/userModel"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const user = new User({
    name,
    email,
    password,
  });

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const newUser = await user.save();

    return res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email }).select("-__v");
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} does not exist`,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: existedUser._id, email: existedUser.email, role: existedUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { name, role, _id, email: newEmail, createdAt } = existedUser;

    const newUser = {
      name,
      role,
      _id,
      email: newEmail,
      createdAt,
    };

    const options = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
