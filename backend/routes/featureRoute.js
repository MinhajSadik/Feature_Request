const express = require("express");
const {
  addNewFeature,
  getAllFeatures,
  changeStatus,
  updateVotes,
  updateComment,
  searchByFeatureName,
} = require("../controllers/featureController");
const {
  featureSchemaValidate,
} = require("../middlewares/validators/featureSchemaValidate");
const { verifyAuthToken } = require("../middlewares/verifyAuthToken");
const router = express.Router();

router
  .route("/add")
  .post(featureSchemaValidate, verifyAuthToken, addNewFeature);
router.route("/all").get(getAllFeatures);
router.route("/vote").put(updateVotes);
router.route("/comment").put(updateComment);
router.route("/search/:searchName").get(searchByFeatureName);
router.route("/update_status").put(verifyAuthToken, changeStatus);

module.exports = router;
