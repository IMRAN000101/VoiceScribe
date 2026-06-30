// POST    /api/recordings
// GET     /api/recordings
// GET     /api/recordings/:id
// PUT     /api/recordings/:id
// DELETE  /api/recordings/:id
const { auth: authMiddleware } = require("../middleware/authMiddleware");
const {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
} = require("../controllers/recordingController");

const express = require("express");

const router = express.Router();

router.post("/recordings", authMiddleware, createRecording);
router.get("/recordings", authMiddleware, getRecordings);
router.get("/recordings/:id", authMiddleware, getRecordingById);
router.put("/recordings/:id", authMiddleware, updateRecording);
router.delete("/recordings/:id", authMiddleware, deleteRecording);

module.exports = router;
