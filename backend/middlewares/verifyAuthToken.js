const jwt = require("jsonwebtoken");

exports.verifyAuthToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      name: "TokenMissingError",
      success: false,
      message: "something went wrong",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};
