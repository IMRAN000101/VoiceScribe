const express = require("express");
const cors = require("cors");
const transcriptionRoutes = require("./routes/transcriptionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "VoiceScribe AI Backend Running",
  });
});

app.use("/api", transcriptionRoutes);

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
