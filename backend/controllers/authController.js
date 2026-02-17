console.log("Login API Hit:", req.body);
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({
    name,
    email,
    password,
    role,
  });

  await user.save();

  res.status(201).json({ message: "User registered successfully" });
};

// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   console.log("REQ BODY:", req.body);

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     if (user.password !== password)
//       return res.status(400).json({ message: "Invalid password" });

//     // 🔥 GENERATE TOKEN HERE
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET || "secretkey",
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token: token, // send token separately
//       user: {
//         role: user.role,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    // For now simple token (you can later use JWT)
    const token = "dummy-token-" + user._id;

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// const User = require("../models/User");
// exports.login = async (req, res) => {
//   console.log("REQ BODY:", req.body);
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     if (user.password !== password)
//       return res.status(400).json({ message: "Invalid password" });

//     res.status(200).json({
//       message: "Login successful",
//       user: {

//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
