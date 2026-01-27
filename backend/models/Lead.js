import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    course: String,
    source: String,

    status: {
      type: String,
      enum: ["pending", "followup", "callback", "cold", "converted"],
      default: "pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Telecaller
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Manager
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
