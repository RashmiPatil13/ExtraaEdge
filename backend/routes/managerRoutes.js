import express from "express";
import multer from "multer";
import xlsx from "xlsx";

import User from "../models/User.js";
import Lead from "../models/Lead.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* TELECALLERS LIST */
router.get("/telecallers", authMiddleware, async (req, res) => {
  const telecallers = await User.find({
    role: "telecaller",
    isApproved: true,
  });

  res.json(telecallers);
});

/* DASHBOARD STATS */
router.get("/stats", authMiddleware, async (req, res) => {
  const managerId = req.user.id; // ✅ FROM TOKEN

  const total = await Lead.countDocuments({ createdBy: managerId });
  const assigned = await Lead.countDocuments({
    createdBy: managerId,
    assignedTo: { $ne: null },
  });
  const converted = await Lead.countDocuments({
    createdBy: managerId,
    status: "converted",
  });

  res.json({ total, assigned, converted });
});

/* EXCEL UPLOAD */
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    const leads = data.map((row) => ({
      name: row.Name,
      mobile: row.Mobile,
      course: row.Course,
      source: row.Source,
      createdBy: req.user.id, // ✅ FIXED
    }));

    await Lead.insertMany(leads);

    res.json({ message: "Leads uploaded successfully" });
  }
);

/* ASSIGN LEADS */
router.post("/assign", authMiddleware, async (req, res) => {
  const { leadIds, telecallerId } = req.body;

  await Lead.updateMany(
    { _id: { $in: leadIds }, createdBy: req.user.id },
    { assignedTo: telecallerId }
  );

  res.json({ message: "Leads assigned successfully" });
});

/* TELECALLER PERFORMANCE */
router.get("/telecaller-records", authMiddleware, async (req, res) => {
  const records = await Lead.aggregate([
    {
      $match: { createdBy: req.user._id },
    },
    {
      $group: {
        _id: "$assignedTo",
        total: { $sum: 1 },
        converted: {
          $sum: {
            $cond: [{ $eq: ["$status", "converted"] }, 1, 0],
          },
        },
      },
    },
  ]);

  res.json(records);
});

export default router;

// import express from "express";
// import multer from "multer";
// import xlsx from "xlsx";

// import User from "../models/User.js";
// import Lead from "../models/Lead.js";

// const router = express.Router();

// /* TELECALLERS LIST */
// router.get("/telecallers", async (req, res) => {
//   const telecallers = await User.find({ role: "telecaller", isApproved: true });
//   res.json(telecallers);
// });

// /* DASHBOARD STATS */
// router.get("/stats/:managerId", async (req, res) => {
//   const managerId = req.params.managerId;

//   const total = await Lead.countDocuments({ createdBy: managerId });
//   const assigned = await Lead.countDocuments({
//     createdBy: managerId,
//     assignedTo: { $ne: null },
//   });
//   const converted = await Lead.countDocuments({
//     createdBy: managerId,
//     status: "converted",
//   });

//   res.json({ total, assigned, converted });
// });

// /* EXCEL UPLOAD */
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("file"), async (req, res) => {
//   const workbook = xlsx.readFile(req.file.path);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = xlsx.utils.sheet_to_json(sheet);

//   const leads = data.map((row) => ({
//     name: row.Name,
//     mobile: row.Mobile,
//     course: row.Course,
//     source: row.Source,
//     createdBy: req.body.managerId,
//   }));

//   await Lead.insertMany(leads);
//   res.json({ message: "Leads uploaded successfully" });
// });

// /* ASSIGN LEADS */
// router.post("/assign", async (req, res) => {
//   const { leadIds, telecallerId } = req.body;

//   await Lead.updateMany(
//     { _id: { $in: leadIds } },
//     { assignedTo: telecallerId }
//   );

//   res.json({ message: "Leads assigned successfully" });
// });

// /*TELECALLER PERFORMANCE */
// router.get("/telecaller-records", async (req, res) => {
//   const records = await Lead.aggregate([
//     {
//       $group: {
//         _id: "$assignedTo",
//         total: { $sum: 1 },
//         converted: {
//           $sum: {
//             $cond: [{ $eq: ["$status", "converted"] }, 1, 0],
//           },
//         },
//       },
//     },
//   ]);

//   res.json(records);
// });

// export default router;
