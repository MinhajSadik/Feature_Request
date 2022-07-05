const express = require("express"),
  router = express.Router(),
  {
    addNewForm,
    getForm,
    updateForm,
  } = require("../controllers/formController"),
  { verifyAuthToken } = require("../middlewares/verifyAuthToken");

router.post("/addForm", verifyAuthToken, addNewForm);
router.get("/getForm", getForm);
router.put("/updateForm", verifyAuthToken, updateForm);

module.exports = router;
