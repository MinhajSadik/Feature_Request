import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const checkAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    if (!token) {
      return res.status(401).json({
        message: "token is required",
      });
    }

    if (token && isCustomAuth) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      req.user = user;
    }
    // req.token = token;
    return next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
