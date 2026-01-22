const express = require("express");
const router = express.Router();
const authMiddleware = require("./authMiddleware");

// PUBLIC
router.get("/public/status", (req, res) => {
  res.json({ status: "ok", message: "Public API is running" });
});

// LOGIN
const jwt = require("jsonwebtoken");
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "demo" || password !== "password") {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// PROTECTED
router.get("/private/profile", authMiddleware, (req, res) => {
  res.json({
    username: req.user.username,
    role: "user",
    message: "Protected profile data"
  });
});

module.exports = router;
