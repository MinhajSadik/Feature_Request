const Feature = require("../models/featureModel");
const { isAdmin } = require("../utils/helpers");

exports.addNewFeature = async (req, res) => {
  try {
    const newFeature = new Feature({
      ...req.body,
      userId: req.user._id,
    });

    console.log(req.user);

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
    console.error(error.message);
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
      .sort({ createdAt: -1 })
      .exec();

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
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.updateVotes = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.searchByFeatureName = async (req, res) => {
  const searchName = req.params.searchName
    .toLowerCase()
    .replace(/\s/g, " ")
    .trim();
  try {
    const features = await Feature.find({
      $or: [
        { title: { $regex: searchName, $options: "i" } },
        { description: { $regex: searchName, $options: "i" } },
      ],
    })
      .populate("userId", "-__v -password -email")
      .populate("comments.user", "-__v -password -email")
      .sort({ createdAt: -1 })
      .exec();

    if (features.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No features found with name '${searchName}'`,
      });
    }

    if (!searchName.length) {
      return res.status(404).json({
        success: false,
        message: `No searches found with name '${searchName}'`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `${features.length} features found with name '${searchName}'`,
      features,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.changeStatus = async (req, res) => {
  const { _id, status } = req.body;
  if (!isAdmin(req)) {
    return res.status(403).json({
      success: false,
      message: `${req.user.name} You're not authorized to perform this action`,
    });
  }
  try {
    const updatedFeature = await Feature.findOneAndUpdate(
      {
        _id,
      },
      {
        status,
      },
      {
        new: true,
      }
    )
      .populate("userId", "-__v -password -email")
      .populate("comments.user", "-__v -password -email")
      .exec();

    if (!updatedFeature) {
      return res.status(404).json({
        success: false,
        message: `Feature with id ${_id} does not exist`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Feature status have ${status} updated successfully`,
      updatedFeature,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};
