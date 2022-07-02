const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./configs/database");

dotenv.config({ path: "./configs/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//connected to database
connectDB();

//Routes
const featureRoute = require("./routes/featureRoute");
const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);
app.use("/feature", featureRoute);

app.get("/", (req, res) => {
  console.log("Hello Feature_Request console viewer");
  return res.send("Hello Feature_Request API viewer");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
