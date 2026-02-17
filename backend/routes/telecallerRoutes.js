import express from "express";
import Lead from "../models/Lead.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ASSIGNED LEADS FOR TELECALLER */
router.get("/my-leads", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.user.id });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching leads" });
  }
});

/* UPDATE LEAD STATUS + REMARKS + FOLLOWUP DATE */
// router.put(
//   "/update-lead/:id",
//   authMiddleware(["telecaller"]),
//   async (req, res) => {
//     try {
//       const { status, remarks, followUpDate } = req.body;

//       const lead = await Lead.findById(req.params.id);

//       lead.status = status;
//       lead.remarks = remarks;
//       lead.followUpDate = followUpDate;

//       lead.activities.push({
//         action: `Status changed to ${status}`,
//         remarks,
//       });

//       await lead.save();

//       res.json({ msg: "Lead updated successfully" });
//     } catch (err) {
//       res.status(500).json({ msg: "Update failed" });
//     }
//   }
// );
router.put("/lead/:id", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    const { status, remarks } = req.body;

    await Lead.findByIdAndUpdate(req.params.id, {
      status,
      remarks,
      updatedAt: new Date(),
    });

    res.json({ msg: "Lead updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

// router.get(
//   "/daily-report",
//   authMiddleware(["telecaller"]),
//   async (req, res) => {
//     try {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       const leads = await Lead.find({
//         assignedTo: req.user.id,
//         updatedAt: { $gte: today },
//       });

//       res.json(leads);
//     } catch (err) {
//       res.status(500).json({ msg: "Error fetching daily report" });
//     }
//   }
// );
router.get(
  "/daily-report",
  authMiddleware(["telecaller"]),
  async (req, res) => {
    try {
      const leads = await Lead.find({
        assignedTo: req.user.id,
      }).sort({ updatedAt: -1 });

      res.json(leads);
    } catch (err) {
      res.status(500).json({ msg: "Error fetching daily report" });
    }
  }
);

router.get("/stats", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    const telecallerId = req.user.id;

    const total = await Lead.countDocuments({ assignedTo: telecallerId });

    const followups = await Lead.countDocuments({
      assignedTo: telecallerId,
      status: "followup",
    });

    const callbacks = await Lead.countDocuments({
      assignedTo: telecallerId,
      status: "callback",
    });

    const converted = await Lead.countDocuments({
      assignedTo: telecallerId,
      status: "converted",
    });

    const cold = await Lead.countDocuments({
      assignedTo: telecallerId,
      status: "cold",
    });

    res.json({
      total,
      followups,
      callbacks,
      converted,
      cold,
    });
  } catch (err) {
    res.status(500).json({ msg: "Stats error" });
  }
});
router.get(
  "/daily-performance",
  authMiddleware(["telecaller"]),
  async (req, res) => {
    try {
      const telecallerId = req.user.id;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const converted = await Lead.countDocuments({
        assignedTo: telecallerId,
        status: "converted",
        "activities.date": { $gte: today },
      });

      const followups = await Lead.countDocuments({
        assignedTo: telecallerId,
        status: "followup",
        "activities.date": { $gte: today },
      });

      const callbacks = await Lead.countDocuments({
        assignedTo: telecallerId,
        status: "callback",
        "activities.date": { $gte: today },
      });

      const cold = await Lead.countDocuments({
        assignedTo: telecallerId,
        status: "cold",
        "activities.date": { $gte: today },
      });

      res.json({ converted, followups, callbacks, cold });
    } catch (err) {
      res.status(500).json({ msg: "Daily analytics error" });
    }
  }
);

export default router;

// import express from "express";
// import Lead from "../models/Lead.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // GET LEADS ASSIGNED TO TELECALLER
// router.get("/leads", authMiddleware(["telecaller"]), async (req, res) => {
//   const leads = await Lead.find({ assignedTo: req.user.id });
//   res.json(leads);
// });

// // UPDATE LEAD STATUS
// router.put("/lead/:id", authMiddleware(["telecaller"]), async (req, res) => {
//   const { status, remarks } = req.body;

//   await Lead.findByIdAndUpdate(req.params.id, {
//     status,
//     remarks,
//   });

//   res.json({ message: "Lead updated" });
// });

// // 👇👇 ADD THIS NEW API FOR STATS

// router.get("/stats", authMiddleware(["telecaller"]), async (req, res) => {
//   const userId = req.user.id;

//   const total = await Lead.countDocuments({ assignedTo: userId });

//   const followup = await Lead.countDocuments({
//     assignedTo: userId,
//     status: "followup",
//   });

//   const callback = await Lead.countDocuments({
//     assignedTo: userId,
//     status: "callback",
//   });

//   const converted = await Lead.countDocuments({
//     assignedTo: userId,
//     status: "converted",
//   });

//   const cold = await Lead.countDocuments({
//     assignedTo: userId,
//     status: "cold",
//   });

//   res.json({
//     total,
//     followup,
//     callback,
//     converted,
//     cold,
//   });
// });

// export default router;
