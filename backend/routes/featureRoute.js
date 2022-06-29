const express = require("express");
const {
  addNewFeature,
  getAllFeatures,
  changeStatus,
  updateVotes,
  updateComment,
  searchByFeatureName,
} = require("../controllers/featureController");
const router = express.Router();

router.route("/add").post(addNewFeature);
router.route("/all").get(getAllFeatures);
router.route("/votes").put(updateVotes);
router.route("/comment").put(updateComment);
router.route("/update_status").put(changeStatus);
router.route("/search/:searchValue").get(searchByFeatureName);

module.exports = router;
