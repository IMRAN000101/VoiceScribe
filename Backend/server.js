const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const upload = multer({ dest: "uploads/" });

app.post("/api/transcribe", upload.single("audio"), (req, res) => {
  console.log("File recieved.");
  console.log(req.file);

  res.json({
    success: true,
    message: "Audio Recieved",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
