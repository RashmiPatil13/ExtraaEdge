import express from "express";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

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
      const { message, role } = req.body;

      const newMessage = new Notification({
        message,
        role, // admin / telecaller
        senderName: req.user.name,
        userId: null,
      });

      await newMessage.save();

      res.json({ message: "Message sent successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error sending message" });
    }
  }
);

export default router;
// import express from "express";
// import mongoose from "mongoose";
// import Notification from "../models/Notification.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get(
//   "/notifications",
//   authMiddleware(["manager", "telecaller", "admin"]),
//   async (req, res) => {
//     try {
//       const notifications = await Notification.find({
//         $or: [
//           { role: req.user.role, userId: null },
//           { userId: new mongoose.Types.ObjectId(req.user.id) },
//         ],
//       }).sort({ createdAt: -1 });

//       res.json(notifications);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error fetching notifications" });
//     }
//   }
// );

// // MARK AS READ
// router.put("/notifications/read/:id", async (req, res) => {
//   await Notification.findByIdAndUpdate(req.params.id, {
//     isRead: true,
//   });

//   res.json({ message: "Read" });
// });

// // ✅ SEND MESSAGE
// router.post(
//   "/messages/send",
//   authMiddleware(["manager", "telecaller", "admin"]),
//   async (req, res) => {
//     try {
//       const { message, role } = req.body;

//       const newMessage = new Notification({
//         message,
//         role,                // admin / telecaller
//         senderName: req.user.name,
//         userId: null,
//       });

//       await newMessage.save();

//       res.json({ message: "Message sent successfully" });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Error sending message" });
//     }
//   }
// );

// export default router;
