// import express from "express";
// import User from "../models/User.js";

// const router = express.Router();

// // 🔹 Get all managers & telecallers
// router.get("/users", async (req, res) => {
//   const users = await User.find({}, "-password");
//   res.json(users);
// });

// // 🔹 Approve / Block user
// router.put("/approve/:id", async (req, res) => {
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { isApproved: true },
//     { new: true }
//   );
//   res.json(user);
// });

// // 🔹 Edit user
// router.put("/edit/:id", async (req, res) => {
//   const { name, email, role } = req.body;
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { name, email, role },
//     { new: true }
//   );
//   res.json(user);
// });

// // 🔹 Delete user
// router.delete("/delete/:id", async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// });

// router.put(
//   "/approve/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   async (req, res) => {
//     await User.findByIdAndUpdate(req.params.id, {
//       isApproved: true,
//     });
//     res.json({ message: "User approved" });
//   }
// );

// export default router;
import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import roleMiddleware from "../middleware/roleMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();
router.get("/stats", getAdminStats);

/*  GET ALL USERS  */

router.get("/users", authMiddleware(["admin"]), async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// router.get(
//   "/users",
//   authMiddleware,

//   roleMiddleware("admin"),
//   async (req, res) => {
//     const users = await User.find({}, "-password");
//     res.json(users);
//   }
// );

/*  APPROVE USER  */
// router.put(
//   "/approve/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   async (req, res) => {
//     await User.findByIdAndUpdate(req.params.id, {
//       isApproved: true,
//     });
//     res.json({ message: "User approved" });
//   }
// );
// router.put("/approve/:id", authMiddleware(["admin"]), async (req, res) => {
//   await User.findByIdAndUpdate(req.params.id, {
//     isApproved: true,
//   });
//   res.json({ message: "User approved" });
// });
// approve and disapprove
router.put(
  "/toggle-approval/:id",
  authMiddleware(["admin"]),
  async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = !user.isApproved; // toggle true/false
    await user.save();

    res.json({
      message: `User ${user.isApproved ? "approved" : "disapproved"}`,
      isApproved: user.isApproved,
    });
  }
);
/*  EDIT USER  */
// router.put(
//   "/edit/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   async (req, res) => {
//     const { name, email, role } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, role },
//       { new: true }
//     );

//     res.json(user);
//   }
// );
router.put("/edit/:id", authMiddleware(["admin"]), async (req, res) => {
  const { name, email, role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  );

  res.json(user);
});

/*  DELETE USER  */
router.delete("/delete/:id", authMiddleware(["admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});
//  disapprove
// router.put("/disapprove/:id", authMiddleware(["admin"]), async (req, res) => {
//   await User.findByIdAndUpdate(req.params.id, {
//     isApproved: false,
//   });

//   res.json({ message: "User disapproved" });
// });

import Notification from "../models/Notification.js";

/* GET USERS BY ROLE */
router.get("/users/:role", authMiddleware(["admin"]), async (req, res) => {
  const users = await User.find({ role: req.params.role }, "-password");
  res.json(users);
});

/* SEND NOTIFICATION */
router.post(
  "/send-notification",
  authMiddleware(["admin"]),
  async (req, res) => {
    const { message, role, userId } = req.body;

    const notification = new Notification({
      message,
      role,
      userId: userId || null,
    });

    await notification.save();

    res.json({ message: "Notification sent successfully" });
  }
);
export default router;
