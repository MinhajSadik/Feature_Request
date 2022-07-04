const mongoose = require("mongoose"),
  dotenv = require("dotenv");

dotenv.config({ path: "./configs/config.env" });
const Remote_Url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu4qt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const Local_Url = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;
const DB_URL = process.env.NODE_ENV === "production" ? Remote_Url : Local_Url;

// const DB_URL = Local_Url;
console.log(process.env.DB_NAME);
console.log(DB_URL);

const connectDB = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(DB_URL, options);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
