import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Get all managers & telecallers
router.get("/users", async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// 🔹 Approve / Block user
router.put("/approve/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );
  res.json(user);
});

// 🔹 Edit user
router.put("/edit/:id", async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  );
  res.json(user);
});

// 🔹 Delete user
router.delete("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
