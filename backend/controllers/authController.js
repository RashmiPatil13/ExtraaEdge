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

const User = require("../models/User");
exports.login = async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// export const login = async (req, res) => {
//   const { email, password, role } = req.body;

//   // TEMP CHECK (for testing)
//   if (!email || !password || !role) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   res.json({
//     message: "Login successful",
//     role: role,
//   });
// };

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
