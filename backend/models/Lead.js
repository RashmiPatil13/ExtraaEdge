// import mongoose from "mongoose";

// const leadSchema = new mongoose.Schema(
//   {
//     name: String,
//     mobile: String,
//     course: String,
//     source: String,

//     status: {
//       type: String,
//       enum: ["pending", "followup", "callback", "cold", "converted"],
//       default: "pending",
//     },

//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Telecaller
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Manager
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Lead", leadSchema);

const leadSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  course: String,
  source: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["new", "assigned", "converted"],
    default: "new",
  },
});
export default mongoose.model("Lead", leadSchema);
// import mongoose from "mongoose";

// const leadSchema = new mongoose.Schema(
//   {
//     name: String,
//     mobile: String,
//     course: String,
//     source: String,

//     status: {
//       type: String,
//       enum: ["new", "followup", "callback", "cold", "converted"],
//       default: "new",
//     },

//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     remarks: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Lead", leadSchema);
