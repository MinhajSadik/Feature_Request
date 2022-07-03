const Feature = require("../models/featureModel");

exports.addNewFeature = async (req, res) => {
  const { title, description, userId, status, logo } = req.body;
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
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
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
      req.body,
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
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  const { _id, comments } = req.body;
  try {
    const updatedFeature = await Feature.findOneAndUpdate(
      {
        _id,
      },
      {
        comments,
      },
      {
        new: true,
      }
    ).populate("comments.user", "-__v -password -email");

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
      .populate("comments.user", "-__v -password -email");

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

exports.changeStatus = async (req, res) => {};
