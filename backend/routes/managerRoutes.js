// import express from "express";
// import multer from "multer";
// import xlsx from "xlsx";
// import User from "../models/User.js";
// import Lead from "../models/Lead.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// /* TELECALLERS LIST */
// router.get("/telecallers", authMiddleware, async (req, res) => {
//   const telecallers = await User.find({
//     role: "telecaller",
//     isApproved: true,
//   });

//   res.json(telecallers);
// });

// /* DASHBOARD STATS */
// router.get("/stats", authMiddleware, async (req, res) => {
//   const managerId = req.user.id;

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

// router.post(
//   "/upload",
//   authMiddleware,
//   upload.single("file"),
//   async (req, res) => {
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(sheet);

//     const leads = data.map((row) => ({
//       name: row.Name,
//       mobile: row.Mobile,
//       course: row.Course,
//       source: row.Source,
//       createdBy: req.user.id, // ✅ FIX
//     }));

//     await Lead.insertMany(leads);
//     res.json({ message: "Leads uploaded successfully" });
//   }
// );
// /* ASSIGN LEADS */
// router.post("/assign", authMiddleware, async (req, res) => {
//   const { leadIds, telecallerId } = req.body;

//   await Lead.updateMany(
//     { _id: { $in: leadIds }, createdBy: req.user.id },
//     { assignedTo: telecallerId }
//   );

//   res.json({ message: "Leads assigned successfully" });
// });

// router.get("/unassigned-leads", authMiddleware, async (req, res) => {
//   const leads = await Lead.find({
//     createdBy: req.user.id,
//     assignedTo: null,
//   });
//   res.json(leads);
// });
// // charts
// router.get("/chart-data", authMiddleware, async (req, res) => {
//   const data = await Lead.aggregate([
//     { $match: { createdBy: req.user.id } },
//     { $group: { _id: "$status", value: { $sum: 1 } } },
//   ]);
//   res.json(data);
// });

// /* TELECALLER PERFORMANCE */
// router.get("/telecaller-records", authMiddleware, async (req, res) => {
//   const records = await Lead.aggregate([
//     {
//       $match: { createdBy: req.user._id },
//     },
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

import express from "express";
// import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import authMiddleware from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";
import multer from "multer";
import XLSX from "xlsx";

/* Excel Upload */
const excelUpload = multer({ dest: "uploads/" });

/* WhatsApp Screenshot Upload */
const screenshotUpload = multer({ dest: "screenshots/" });

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

/* =========================
   GET ALL TELECALLERS
========================= */
// router.get(
//   "/telecallers",
//   authMiddleware,
//   roleMiddleware("manager"),
//   async (req, res) => {
//     try {
//       const telecallers = await User.find({
//         role: "telecaller",
//         isApproved: true,
//         createdBy: req.user.id, // VERY IMPORTANT
//       }).select("_id name");

//       res.json(telecallers);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   }
// );

router.get("/telecaller-records", protect(["manager"]), async (req, res) => {
  const records = await Lead.aggregate([
    { $match: { managerId: req.user.id } },
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

/* =========================
   MANAGER DASHBOARD STATS
========================= */
// router.get(
//   "/stats",
//   authMiddleware,
//   roleMiddleware("manager"),
//   async (req, res) => {
//     try {
//       const managerId = req.user.id;

//       const total = await Lead.countDocuments({ createdBy: managerId });
//       const assigned = await Lead.countDocuments({
//         createdBy: managerId,
//         assignedTo: { $ne: null },
//       });
//       const converted = await Lead.countDocuments({
//         createdBy: managerId,
//         status: "converted",
//       });

//       res.json({ total, assigned, converted });
//     } catch (err) {
//       res.status(500).json({ message: "Failed to load stats" });
//     }
//   }
// );

router.get("/stats", protect(["manager"]), async (req, res) => {
  const managerId = req.user.id;

  const total = await Lead.countDocuments({ managerId });
  const assigned = await Lead.countDocuments({
    managerId,
    status: "assigned",
  });
  const converted = await Lead.countDocuments({
    managerId,
    status: "converted",
  });

  res.json({ total, assigned, converted });
});

/* =========================
   UPLOAD EXCEL LEADS
========================= */

router.post(
  "/upload",
  protect(["manager"]),
  excelUpload.single("file"),
  async (req, res) => {
    res.json({ msg: "Excel uploaded" });
  }
);

// router.post(
//   "/upload",
//   protect(["manager"]),
//   upload.single("file"),
//   async (req, res) => {
//     const workbook = XLSX.readFile(req.file.path);
//     const sheet = XLSX.utils.sheet_to_json(
//       workbook.Sheets[workbook.SheetNames[0]]
//     );

//     const leads = sheet.map((row) => ({
//       name: row.Name,
//       mobile: row.Mobile,
//       course: row.Course,
//       source: row.Source,
//       managerId: req.user.id,
//     }));

//     await Lead.insertMany(leads);
//     res.json({ msg: "Leads uploaded successfully" });
//   }
// );

// router.post(
//   "/upload-excel",
//   authMiddleware,
//   roleMiddleware("manager"),
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       const workbook = xlsx.readFile(req.file.path);
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];

//       const data = xlsx.utils.sheet_to_json(sheet);

//       if (data.length === 0) {
//         return res.status(400).json({ message: "Excel is empty" });
//       }

//       const leads = data.map((item) => ({
//         name: item.Name,
//         mobile: item.Mobile,
//         course: item.Course,
//         source: item.Source,
//         createdBy: req.user.id,
//         assignedTo: null,
//       }));

//       await Lead.insertMany(leads);

//       res.json({ message: "Excel uploaded successfully", count: leads.length });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Excel upload failed" });
//     }
//   }
// );
// router.post(
//   "/upload",
//   authMiddleware,
//   roleMiddleware("manager"),
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//       }

//       const workbook = xlsx.readFile(req.file.path);
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const data = xlsx.utils.sheet_to_json(sheet);

//       const leads = data.map((row) => ({
//         name: row.Name,
//         mobile: row.Mobile,
//         course: row.Course,
//         source: row.Source,
//         status: "new",
//         createdBy: req.user.id,
//       }));

//       await Lead.insertMany(leads);

//       fs.unlinkSync(req.file.path); // cleanup uploaded file

//       res.json({ message: "Leads uploaded successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Excel upload failed" });
//     }
//   }
// );

/* =========================
   GET UNASSIGNED LEADS
========================= */
router.get(
  "/unassigned-leads",
  authMiddleware,
  roleMiddleware("manager"),
  async (req, res) => {
    try {
      const leads = await Lead.find({
        createdBy: req.user.id,
        assignedTo: null,
      });

      res.json(leads);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  }
);

/* =========================
   ASSIGN LEADS TO TELECALLER
========================= */
router.post(
  "/assign",
  authMiddleware,
  roleMiddleware("manager"),
  async (req, res) => {
    try {
      const { leadIds, telecallerId } = req.body;

      if (!leadIds || !telecallerId) {
        return res.status(400).json({ message: "Missing data" });
      }

      await Lead.updateMany(
        { _id: { $in: leadIds }, createdBy: req.user.id },
        { assignedTo: telecallerId }
      );

      res.json({ message: "Leads assigned successfully" });
    } catch (err) {
      res.status(500).json({ message: "Lead assignment failed" });
    }
  }
);

/* =========================
   PIE CHART DATA (RECHARTS)
========================= */
router.get(
  "/chart-data",
  authMiddleware,
  roleMiddleware("manager"),
  async (req, res) => {
    try {
      const data = await Lead.aggregate([
        { $match: { createdBy: req.user.id } },
        {
          $group: {
            _id: "$status",
            value: { $sum: 1 },
          },
        },
      ]);

      const formatted = data.map((d) => ({
        name: d._id || "Pending",
        value: d.value,
      }));

      res.json(formatted);
    } catch (err) {
      res.status(500).json({ message: "Failed to load chart data" });
    }
  }
);

/* =========================
   TELECALLER PERFORMANCE
========================= */
router.get(
  "/telecaller-records",
  authMiddleware,
  roleMiddleware("manager"),
  async (req, res) => {
    try {
      const records = await Lead.aggregate([
        { $match: { createdBy: req.user.id } },
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
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch records" });
    }
  }
);

export default router;
