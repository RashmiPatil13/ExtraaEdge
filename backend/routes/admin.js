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
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
// const user = new User({
//   name,
//   email,
//   password,
//   role: "telecaller",
//   createdBy: managerId,
//   isApproved: true,
// });
/*  GET ALL USERS  */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const users = await User.find({}, "-password");
    res.json(users);
  }
);

/*  APPROVE USER  */
router.put(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      isApproved: true,
    });
    res.json({ message: "User approved" });
  }
);

/*  EDIT USER  */
router.put(
  "/edit/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    res.json(user);
  }
);

/*  DELETE USER  */
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  }
);

export default router;
