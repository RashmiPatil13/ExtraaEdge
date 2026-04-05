import express from "express";
import Lead from "../models/Lead.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ASSIGNED LEADS FOR TELECALLER */

router.get("/my-leads", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    const { status } = req.query;

    let filter = { assignedTo: req.user.id };

    if (status && status !== "all") {
      filter.status = status;
    }

    const leads = await Lead.find(filter);

    res.json(leads);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching leads" });
  }
});

router.put("/lead/:id", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    const { status, remarks, followUpDate } = req.body;

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        remarks,
        followUpDate,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.json({ msg: "Lead updated successfully", updated });
  } catch (err) {
    console.log("Update Error:", err);
    res.status(500).json({ msg: "Update failed" });
  }
});

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
router.delete("/lead/:id", authMiddleware(["telecaller"]), async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ msg: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});

export default router;
