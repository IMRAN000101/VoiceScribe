const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const transcriptionRoutes = require("./routes/transcriptionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recordingRoutes = require("./routes/recordingRoutes");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(helmet());

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "VoiceScribe AI Backend Running",
  });
});

// Speech-to-text routes
app.use("/api", transcriptionRoutes);

// AI analysis routes
app.use("/api", aiRoutes);

//Recording Routes
app.use("/api", recordingRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

//User routes
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("[ERROR] Unhandled error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
