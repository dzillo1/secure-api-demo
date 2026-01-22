const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

/**
 * Public endpoint
 */
router.get("/public/status", (req, res) => {
  res.json({
    status: "API is running",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Login endpoint (demo-only)
 */
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Demo validation ONLY
  if (username !== "demo" || password !== "password") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = { username };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

/**
 * Protected endpoint
 */
router.get("/api/data", authenticateToken, (req, res) => {
  res.json({
    message: "Secure data accessed",
    user: req.user.username,
    data: [
      { id: 1, name: "Button", usageCount: 120 },
      { id: 2, name: "Modal", usageCount: 45 },
    ],
  });
});

module.exports = router;
