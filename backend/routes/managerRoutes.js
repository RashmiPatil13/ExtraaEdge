import express from "express";
import multer from "multer";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import xlsx from "xlsx";
import fs from "fs";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* =========================
   DASHBOARD STATS
========================= */
router.get("/stats", authMiddleware(["manager"]), async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const assigned = await Lead.countDocuments({ assignedTo: { $ne: null } });
    const converted = await Lead.countDocuments({ status: "converted" });

    res.json({ total, assigned, converted });
  } catch (err) {
    res.status(500).json({ msg: "Stats error" });
  }
});

/* =========================
   GET TELECALLERS
========================= */

router.get("/telecallers", authMiddleware(["manager"]), async (req, res) => {
  const telecallers = await User.find(
    { role: "telecaller" },
    "name email role"
  );
  res.json(telecallers);
});

/* =========================
   GET UNASSIGNED LEADS
========================= */
router.get(
  "/unassigned-leads",
  authMiddleware(["manager"]),
  async (req, res) => {
    const leads = await Lead.find({
      assignedTo: null,
    });
    res.json(leads);
  }
);

/* =========================
   ASSIGN LEADS ✅ (MISSING API)
========================= */

router.post("/assign", authMiddleware(["manager"]), async (req, res) => {
  const { leadIds, telecallerId } = req.body;

  await Lead.updateMany(
    { _id: { $in: leadIds } },
    { assignedTo: telecallerId }
  );

  res.json({ msg: "Leads assigned" });
});

/* =========================
   TELECALLER PERFORMANCE
========================= */

// router.get("/telecaller-records", async (req, res) => {
//   const leads = await Lead.find();
//   res.json(leads);
// });
router.get(
  "/telecaller-records",
  authMiddleware(["manager"]),
  async (req, res) => {
    try {
      const telecallers = await User.find({ role: "telecaller" });

      let result = [];

      for (let t of telecallers) {
        const total = await Lead.countDocuments({ assignedTo: t._id });
        const converted = await Lead.countDocuments({
          assignedTo: t._id,
          status: "converted",
        });
        const pending = total - converted;

        result.push({
          name: t.name,
          email: t.email,
          total,
          converted,
          pending,
        });
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching performance" });
    }
  }
);

/* =========================
   UPLOAD EXCEL
========================= */
// router.post(
//   "/upload",
//   authMiddleware(["manager"]),
//   upload.single("file"),
//   async (req, res) => {
//     if (!req.file) return res.status(400).json({ msg: "No file" });
//     res.json({ msg: "Uploaded" });
//   }
// );

router.post(
  "/upload",
  authMiddleware(["manager"]),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded" });
      }

      // Read excel file
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const leads = sheetData.map((row) => ({
        name: row.name || row.Name,
        mobile: row.mobile || row.Mobile,
        course: row.course || row.Course,
        source: row.source || row.Source,
        status: "new",
        assignedTo: null,
        managerId: req.user.id,
      }));

      await Lead.insertMany(leads);

      // Delete file after processing
      fs.unlinkSync(req.file.path);

      res.json({
        msg: "Leads uploaded successfully",
        total: leads.length,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Excel upload failed" });
    }
  }
);
router.get("/date-analytics", authMiddleware(["manager"]), async (req, res) => {
  try {
    const data = await Lead.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formatted = data.map((d) => ({
      date: d._id,
      total: d.total,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: "Date analytics error" });
  }
});
router.get("/leads", authMiddleware(["manager"]), async (req, res) => {
  const { status } = req.query;

  let query = {};

  if (status) query.status = status;

  const leads = await Lead.find(query).populate("assignedTo", "name");

  res.json(leads);
});

router.get("/export", authMiddleware(["manager"]), async (req, res) => {
  const leads = await Lead.find();

  const data = leads.map((l) => ({
    Name: l.name,
    Mobile: l.mobile,
    Status: l.status,
    Course: l.course,
  }));

  const sheet = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, sheet, "Leads");

  xlsx.writeFile(wb, "leads_report.xlsx");

  res.json({ msg: "Exported" });
});

router.get("/analytics", async (req, res) => {
  const { from, to } = req.query;

  const data = await Lead.find({
    createdAt: {
      $gte: new Date(from),
      $lte: new Date(to),
    },
  });

  res.json(data);
});

router.delete("/lead/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

router.put("/lead/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});
//fetch data dropdown
router.get("/telecaller-leads", async (req, res) => {
  try {
    const { telecaller } = req.query;

    let filter = {};

    if (telecaller && telecaller !== "all") {
      filter.assignedTo = telecaller;
    }

    const leads = await Lead.find(filter).populate("assignedTo", "name");

    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
});

router.get("/telecallers", async (req, res) => {
  try {
    const telecallers = await User.find({ role: "telecaller" }).select("name");

    res.json(telecallers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching telecallers" });
  }
});
/*
 REPORTS
*/
router.get("/statusCount", authMiddleware(["manager"]), async (req, res) => {
  try {
    const result = await Lead.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formatted = result.map((r) => ({
      status: r._id,
      count: r.count,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: "Status count error" });
  }
});


export default router;

// import express from "express";
// import xlsx from "xlsx";
// import fs from "fs";
// import User from "../models/User.js";
// import Lead from "../models/Lead.js";
// import authMiddleware from "../middleware/authMiddleware.js";
// import roleMiddleware from "../middleware/roleMiddleware.js";
// import upload from "../middleware/upload.js";
// import multer from "multer";

// const router = express.Router();

// /* Excel Upload */
// const excelUpload = multer({ dest: "uploads/" });

// /* WhatsApp Screenshot Upload */
// const screenshotUpload = multer({ dest: "screenshots/" });

// // const upload = multer({ dest: "uploads/" });

// /* =========================
//    GET ALL TELECALLERS
// ========================= */

// router.get(
//   "/telecaller-records",
//   authMiddleware(["manager"]),
//   async (req, res) => {
//     const records = await Lead.aggregate([
//       { $match: { managerId: req.user.id } },
//       {
//         $group: {
//           _id: "$assignedTo",
//           total: { $sum: 1 },
//           converted: {
//             $sum: {
//               $cond: [{ $eq: ["$status", "converted"] }, 1, 0],
//             },
//           },
//         },
//       },
//     ]);

//     res.json(records);
//   }
// );

// /* =========================
//    MANAGER DASHBOARD STATS
// ========================= */
// router.get("/stats", authMiddleware(["manager"]), async (req, res) => {
//   try {
//     const totalLeads = await Lead.countDocuments();
//     const assignedLeads = await Lead.countDocuments({
//       assignedTo: { $ne: null },
//     });
//     const telecallers = await User.countDocuments({ role: "telecaller" });

//     res.json({
//       totalLeads,
//       assignedLeads,
//       telecallers,
//     });
//   } catch (error) {
//     console.error("Stats error:", error);
//     res.status(500).json({ msg: "Stats fetch failed" });
//   }
// });

// /* =========================
//    UPLOAD EXCEL LEADS
// ========================= */

// router.post(
//   "/upload",
//   authMiddleware(["manager"]),
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({ msg: "No file uploaded" });
//       }

//       res.json({ msg: "File uploaded successfully" });
//     } catch (error) {
//       console.error("Upload error:", error);
//       res.status(500).json({ msg: "Upload failed" });
//     }
//   }
// );

// /* =========================
//    GET UNASSIGNED LEADS
// ========================= */
// router.get(
//   "/unassigned-leads",
//   authMiddleware,
//   roleMiddleware("manager"),
//   async (req, res) => {
//     try {
//       const leads = await Lead.find({
//         createdBy: req.user.id,
//         assignedTo: null,
//       });

//       res.json(leads);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to fetch leads" });
//     }
//   }
// );

// /* =========================
//    ASSIGN LEADS TO TELECALLER
// ========================= */

// router.get("/telecallers", authMiddleware(["manager"]), async (req, res) => {
//   try {
//     const telecallers = await User.find({ role: "telecaller" }, "name _id");

//     res.json(telecallers);
//   } catch (error) {
//     console.error("Telecallers error:", error);
//     res.status(500).json({ msg: "Failed to load telecallers" });
//   }
// });

// /* =========================
//    PIE CHART DATA (RECHARTS)
// ========================= */
// router.get(
//   "/chart-data",
//   authMiddleware,
//   roleMiddleware("manager"),
//   async (req, res) => {
//     try {
//       const data = await Lead.aggregate([
//         { $match: { createdBy: req.user.id } },
//         {
//           $group: {
//             _id: "$status",
//             value: { $sum: 1 },
//           },
//         },
//       ]);

//       const formatted = data.map((d) => ({
//         name: d._id || "Pending",
//         value: d.value,
//       }));

//       res.json(formatted);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to load chart data" });
//     }
//   }
// );

// /* =========================
//    TELECALLER PERFORMANCE
// ========================= */
// router.get(
//   "/telecaller-records",
//   authMiddleware,
//   roleMiddleware("manager"),
//   async (req, res) => {
//     try {
//       const records = await Lead.aggregate([
//         { $match: { createdBy: req.user.id } },
//         {
//           $group: {
//             _id: "$assignedTo",
//             total: { $sum: 1 },
//             converted: {
//               $sum: {
//                 $cond: [{ $eq: ["$status", "converted"] }, 1, 0],
//               },
//             },
//           },
//         },
//       ]);

//       res.json(records);
//     } catch (err) {
//       res.status(500).json({ message: "Failed to fetch records" });
//     }
//   }
// );

// export default router;
