// const jwt = require("jsonwebtoken");

// const protect = (roles = []) => {
//   return (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });

//     const decoded = jwt.verify(token, "SECRET_KEY");

//     if (roles.length && !roles.includes(decoded.role))
//       return res.status(403).json({ message: "Access denied" });

//     req.user = decoded;
//     next();
//   };
// };

// module.exports = protect;

import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(decoded.role))
      return res.status(403).json({ msg: "Access denied" });

    req.user = decoded;
    next();
  };
};

// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // Check token exists
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "No token, authorization denied",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user info to request
//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "Token is not valid",
//     });
//   }
// };

// export default authMiddleware;

// import jwt from "jsonwebtoken";
// import User from "./models/User.js";

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };

//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// export default authMiddleware;
