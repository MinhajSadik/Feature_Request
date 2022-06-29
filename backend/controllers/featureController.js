const Feature = require("../models/featureModel");
const User = require("../models/userModel");

exports.addNewFeature = async (req, res) => {
  const newFeature = new Feature({
    ...req.body,
    userId: req.user.id,
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

exports.getAllFeatures = (req, res) => {};

exports.updateVotes = (req, res) => {};

exports.updateComment = (req, res) => {};

exports.searchByFeatureName = (req, res) => {};

exports.changeStatus = (req, res) => {};
