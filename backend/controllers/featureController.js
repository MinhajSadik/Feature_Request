const Feature = require("../models/featureModel");

exports.addNewFeature = async (req, res) => {
  try {
    const newFeature = new Feature({
      ...req.body,
      userId: req.user._id,
    });

    const feature = await newFeature.save();
    if (!feature) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

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
      .populate("userId", "-__v -password -email -createdAt -updatedAt")
      .populate("comments.user", "-__v -password -email")
      .sort({ createdAt: -1 });

    if (features.length === 0) {
      return res.status(404).json({
        success: false,
        message: "There are no features yet",
      });
    }
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

exports.updateVotes = async (req, res) => {
  const { _id, votes } = req.body;
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(
      {
        _id,
      },
      {
        votes,
      },
      {
        new: true,
      }
    );

    if (!updatedFeature) {
      return res.status(404).json({
        success: false,
        message: `Feature with id ${_id} does not exist`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Feature with id ${_id} updated successfully`,
      updatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {};

exports.searchByFeatureName = async (req, res) => {};

exports.changeStatus = async (req, res) => {};
