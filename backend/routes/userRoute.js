import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  loginValidate,
  registerValidate,
} from "../middlewares/validators/userSchemaValidate";
const router = express.Router();

router.post("/register", registerValidate, registerUser);
router.post("/login", loginValidate, loginUser);

export default router;
