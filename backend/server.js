const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/database");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config({ path: "./configs/config.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

connectDB();

//Routes
const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

app.get("/", (req, res) => {
  console.log("Hello Feature_Request console viewer");
  return res.send("Hello Feature_Request API viewer");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
