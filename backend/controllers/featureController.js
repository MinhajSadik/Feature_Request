const Feature = require("../models/featureModel");
const User = require("../models/userModel");

exports.addNewFeature = async (req, res) => {
  const { title, description, status, userId } = req.body;
  const newFeature = new Feature({
    title,
    description,
    status,
    userId,
  });

  try {
    const feature = await newFeature.save();
    return res.status(201).json({
      name: feature.title,
      success: true,
      message: `Feature: '${feature.title}' added successfully`,
      feature,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find({})
      .populate("userId", "-__v -password -email")
      .populate("comments.user", "-__v -password -email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All features fetched successfully",
      features,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVotes = async (req, res) => {};

exports.updateComment = async (req, res) => {};

exports.searchByFeatureName = async (req, res) => {};

exports.changeStatus = async (req, res) => {};
