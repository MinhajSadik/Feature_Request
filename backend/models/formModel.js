const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    requestForm: [mongoose.Schema.Types.Mixed],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    strict: false,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
