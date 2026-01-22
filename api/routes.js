const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

router.get("/public/status", (req, res) => {
  res.json({ status: "ok", message: "Public API is running" });
});

router.post("/auth/login", (req, res) => {
  const jwt = require("jsonwebtoken");
  const { username, password } = req.body;

  if (username !== "demo" || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// 🔒 PROTECTED ROUTE
router.get("/private/profile", authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
    role: "user",
    message: "Protected profile data"
  });
});

module.exports = router;
