import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./configs/database.js";

dotenv.config({ path: "./configs/config.env" });
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());

connectDB();

//User Routes
import userRoute from "./routes/userRoute.js";
app.use("/user", userRoute);

//Feature Routes
import featureRoute from "./routes/featureRoute.js";
app.use("/feature", featureRoute);

//Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
