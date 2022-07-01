const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/database");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

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
const userRoute = require("./routes/userRoute");
const featureRoute = require("./routes/featureRoute");
app.use("/user", userRoute);
app.use("/feature", featureRoute);

app.get("/", (req, res) => {
  console.log("Hello Feature_Request console viewer");
  return res.send("Hello Feature_Request API viewer");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
