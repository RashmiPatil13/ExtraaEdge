import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "telecaller"],
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // ❌ admin must approve
  },
});

export default mongoose.model("User", userSchema);
