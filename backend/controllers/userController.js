const User = require("../models/userModel"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      result: newUser,
      token,
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
    const verifiedUser = await User.findOne({ email }).select("-__v");
    if (!verifiedUser) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} does not exist`,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      verifiedUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: verifiedUser._id,
        email: verifiedUser.email,
        role: verifiedUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { name, role, _id, email: newEmail, createdAt } = verifiedUser;
    const user = {
      _id,
      name,
      role,
      createdAt,
      email: newEmail,
    };

    // const options = {
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   httpOnly: true,
    // };

    return res.status(200).json({
      token,
      result: user,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
