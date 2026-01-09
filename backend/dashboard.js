const protect = require("./middleware/authMiddleware");

app.get("/admin/dashboard", protect(["admin"]), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

app.get("/telecaller/dashboard", protect(["telecaller"]), (req, res) => {
  res.json({ message: "Telecaller Dashboard" });
});
