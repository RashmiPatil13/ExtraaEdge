import express from "express";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/notifications",
  authMiddleware(["manager", "telecaller", "admin"]),
  async (req, res) => {
    try {
      const notifications = await Notification.find({
        $or: [
          { role: req.user.role, userId: null },
          { userId: new mongoose.Types.ObjectId(req.user.id) },
        ],
      }).sort({ createdAt: -1 });

      res.json(notifications);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching notifications" });
    }
  }
);
router.put("/notifications/read/:id", async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });

  res.json({ message: "Read" });
});

// ✅ SEND MESSAGE
router.post(
  "/messages/send",
  authMiddleware(["manager", "telecaller", "admin"]),
  async (req, res) => {
    try {
      const { message, role, userId } = req.body;

      const newMessage = new Notification({
        message,
        role, // receiver role
        senderName: req.user.name,
        userId: userId || null,
      });

      await newMessage.save();

      res.json({ message: "Message sent successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error sending message" });
    }
  }
);
router.get("/managers", async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("name");
    res.json(managers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching managers" });
  }
});

router.delete("/notifications/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
router.put("/notifications/mark-read", async (req, res) => {
  try {
    await Notification.updateMany(
      { isRead: false },
      { $set: { isRead: true } }
    );

    res.json({ msg: "Notifications marked as read" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating notifications" });
  }
});

export default router;
