const cookieParser = require("cookie-parser"),
  cors = require("cors"),
  dotenv = require("dotenv"),
  express = require("express"),
  morgan = require("morgan"),
  connectDB = require("./configs/database"),
  app = express(),
  PORT = process.env.PORT || 5000,
  corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
  };

//configs and middlewares
dotenv.config({ path: "./configs/config.env" });
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//connected to database
connectDB();

//Routes
const featureRoute = require("./routes/featureRoute"),
  userRoute = require("./routes/userRoute"),
  formRoute = require("./routes/formRoute");
app.use("/user", userRoute);
app.use("/feature", featureRoute);
app.use("/form", formRoute);

//default route
app.all("/", (req, res) => {
  console.log("Hello Feature_Request console viewer");
  return res.send("Hello Feature_Request API viewer");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
