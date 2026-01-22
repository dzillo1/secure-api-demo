const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authMiddleware");

const router = express.Router();

// fake user (demo)
const DEMO_USER = {
  username: "demo",
  password: "password",
};

// login
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== DEMO_USER.username ||
    password !== DEMO_USER.password
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// protected route
router.get(
  "/private/profile",
  authenticateToken,
  (req, res) => {
    res.json({
      message: "Protected data access granted",
      user: req.user,
    });
  }
);

module.exports = router;
