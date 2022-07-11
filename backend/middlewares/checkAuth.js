import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const checkAuthToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      message: "token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: `User with id ${decoded.id} does not exist`,
      });
    }
    req.user = user;
    req.token = token;
    return next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
