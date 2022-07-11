const express = require("express"),
  router = express.Router(),
  {
    addNewFeature,
    getAllFeatures,
    changeStatus,
    updateVotes,
    updateComment,
    searchByFeatureName,
  } = require("../controllers/featureController"),
  {
    featureSchemaValidate,
  } = require("../middlewares/validators/featureSchemaValidate"),
  { verifyAuthToken } = require("../middlewares/verifyAuthToken");

router.post("/add", featureSchemaValidate, addNewFeature);
router.route("/all").get(getAllFeatures);
router.route("/vote").put(updateVotes);
router.route("/comment").put(verifyAuthToken, updateComment);
router.route("/search/:searchName").get(searchByFeatureName);
router.route("/update_status").put(verifyAuthToken, changeStatus);

module.exports = router;
