import express from "express";
import {
  addNewFeature,
  changeStatus,
  getAllFeatures,
  searchByFeatureName,
  updateComment,
  updateVotes,
} from "../controllers/featureController.js";
import { checkAuthToken } from "../middlewares/checkAuth.js";
import { featureSchemaValidate } from "../middlewares/validators/featureSchemaValidate.js";
const router = express.Router();

router.post("/add", checkAuthToken, featureSchemaValidate, addNewFeature);
router.route("/all").get(getAllFeatures);
router.route("/vote").put(updateVotes);
router.route("/comment").put(updateComment);
router.route("/search/:searchName").get(searchByFeatureName);
router.route("/update_status").put(checkAuthToken, changeStatus);

export default router;
