const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // authMiddleware must run before this
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "Unauthorized: user data missing",
        });
      }

      // Check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        message: "Role verification failed",
      });
    }
  };
};

export default roleMiddleware;
