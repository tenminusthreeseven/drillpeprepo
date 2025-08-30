const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------- Routes -------------------

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered");
  } catch {
    res.status(400).send("User already exists");
  }
});

// Signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Incorrect password");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Logged in", savedData: user.savedData });
});

// Auth middleware
const authmiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};

// Save progress
router.post("/save", authmiddleware, async (req, res) => {
  const { savedData } = req.body;
  await User.findByIdAndUpdate(req.user.id, { savedData });
  res.send("Progress saved");
});

// Get progress
router.get("/progress", authmiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ savedData: user.savedData });
});

module.exports = router;
