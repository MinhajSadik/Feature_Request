import mongoose from "mongoose";
const featureSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
    },
    votes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    comments: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          message: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["under_review", "planned", "in-progress", "complete"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { strict: false }
);

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;
