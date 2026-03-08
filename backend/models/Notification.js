import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: String,
    role: String,
    senderName: String,
    senderRole: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
