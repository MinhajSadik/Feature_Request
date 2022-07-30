import FeatureModel from "../models/featureModel.js";
import { isAdmin } from "../utils/helpers.js";

export const addNewFeature = async (req, res) => {
  try {
    const newFeature = new FeatureModel({
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
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

export const getAllFeatures = async (req, res) => {
  try {
    const features = await FeatureModel.find({})
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
    return res.status(200).json(features);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

export const updateVotes = async (req, res) => {
  const { _id, votes } = req.body;
  try {
    const updatedVote = await FeatureModel.findOneAndUpdate({ _id }, req.body, {
      new: true,
    })
      .populate("userId", "-__v -password -email")
      .exec();

    if (!updatedVote) {
      return res.status(404).json({
        success: false,
        message: `Feature with id ${_id} does not exist`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Feature votes have been updated successfully`,
      result: updatedVote,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

//post a comment on a feature
export const addComment = async (req, res) => {
  const { _id, comment } = req.body;
  try {
    const updatedFeature = await FeatureModel.findOneAndUpdate(
      { _id },
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("userId", "-__v -password -email")
      .exec();

    if (!updatedFeature) {
      return res.status(404).json({
        success: false,
        message: `Feature with id ${_id} does not exist`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Comment added successfully`,
      result: updatedFeature,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
};

export const searchByFeatureName = async (req, res) => {
  const searchName = req.params.searchName
    .toLowerCase()
    .replace(/\s/g, " ")
    .trim();
  try {
    const searchesFeature = await FeatureModel.find({
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
      message: `${searchesFeature.length} features found with name '${searchName}'`,
      result: searchesFeature,
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

export const changeStatus = async (req, res) => {
  const { _id, status } = req.body;
  if (!isAdmin(req)) {
    return res.status(403).json({
      success: false,
      message: `${req.user.name} You're not authorized to perform this action`,
    });
  }
  try {
    const changeFeatureStatus = await FeatureModel.findOneAndUpdate(
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

    if (!changeFeatureStatus) {
      return res.status(404).json({
        success: false,
        message: `Feature with id ${_id} does not exist`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Feature status have ${status} updated successfully`,
      result: changeFeatureStatus,
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
