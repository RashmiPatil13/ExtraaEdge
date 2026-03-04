// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema({
//   action: String,
//   remarks: String,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const leadSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   course: String,
//   source: String,
//   email: String,
//   status: String,
//   assignedTo: String,
//   followupDate: String,
//   remarks: String,

//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

//   managerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },

//   status: {
//     type: String,
//     enum: ["new", "assigned", "followup", "callback", "cold", "converted"],
//     default: "new",
//   },

//   remarks: {
//     type: String,
//     default: "",
//   },

//   activities: [activitySchema],

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   followUpDate: {
//     type: Date,
//   },
// });
// export default mongoose.model("Lead", leadSchema);
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  action: String,
  remarks: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const leadSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    course: String,
    source: String,
    email: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["new", "assigned", "followup", "callback", "cold", "converted"],
      default: "new",
    },

    remarks: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },

    activities: [activitySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
