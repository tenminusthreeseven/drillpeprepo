const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // replaces body-parser
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Import routes
const authroutes = require("./routes/authroutes");
const taskroutes = require("./routes/taskroutes");

// Use routes
app.use("/api/auth", authroutes);
app.use("/api/tasks", taskroutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
