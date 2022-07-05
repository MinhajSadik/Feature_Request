const Form = require("../models/formModel"),
  { isAdmin } = require("../utils/helpers");

exports.addNewForm = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({
      success: false,
      message: `${req.user.name} you are not authorized to perform this action`,
    });
  }

  try {
    const newForm = new Form(req.body);
    const savedForm = await newForm.save();
    return res.status(201).json({
      success: true,
      message: "Form added successfully",
      form: savedForm,
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

exports.updateForm = async (req, res) => {
  const { _id, form } = req.body;
  if (!isAdmin(req)) {
    return res.status(401).json({
      success: false,
      message: `${req.user.name} you are not authorized to perform this action`,
    });
  }
  try {
    const updatedForm = await Form.updateOne({ _id }, { form }, { new: true });
    if (!updatedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Form updated successfully",
      form: updatedForm,
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

exports.getForm = async (req, res) => {
  try {
    const form = await Form.findOne({})
      .sort({ createdAt: -1 })
      .populate("user", "name");
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Form fetched successfully",
      form,
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
