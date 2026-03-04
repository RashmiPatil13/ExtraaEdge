import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,

    isApproved: role === "admin" ? true : false,
  });

  res.json({ message: "Registration successful" });
});

/* LOGIN */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: "Invalid password" });
//   }
//   if (!user.isApproved) {
//     return res.status(403).json({ message: "Account not approved by admin" });
//   }

//   res.json({
//     message: "Login successful",
//     role: user.role,
//   });
// });
// import jwt from "jsonwebtoken";

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: "Invalid password" });
//   }

//   if (!user.isApproved) {
//     return res.status(403).json({ message: "Account not approved by admin" });
//   }

//   // 🔥 GENERATE TOKEN HERE
//   const token = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   res.json({
//     message: "Login successful",
//     token: token, // <-- VERY IMPORTANT
//     role: user.role,
//   });
// });

// export default router;

import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  if (!user.isApproved) {
    return res.status(403).json({ message: "Account not approved by admin" });
  }

  // 🔥 GENERATE TOKEN HERE
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token, // 👈 VERY IMPORTANT
    role: user.role,
    name: user.name,
  });
});

export default router;
