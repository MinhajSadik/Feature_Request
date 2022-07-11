import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: `User with email ${email} already exists`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: `User ${name} has been created`,
      result: newUser,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await UserModel.findOne({ email }).select("-__v");
    if (!existedUser) {
      return res.status(400).json({
        message: `User with email ${email} does not exist`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: `Password is incorrect`,
      });
    }

    const token = jwt.sign(
      {
        id: existedUser._id,
        email: existedUser.email,
        role: existedUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const { name, role, _id, email: userEmail, createdAt } = existedUser;
    const user = { name, role, _id, email: userEmail, createdAt };

    return res.status(200).json({
      message: `User ${name} has been logged in`,
      result: user,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
