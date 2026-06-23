const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { transcribe } = require("../controllers/transcriptionController");

const router = express.Router();

router.post("/transcribe", upload.single("audio"), transcribe);

module.exports = router;
