const express = require("express"),
  router = express.Router(),
  {
    validateRegister,
    validateLogin,
  } = require("../middlewares/validators/authSchemaValidate"),
  { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
