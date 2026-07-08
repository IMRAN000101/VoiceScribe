const { transcribeAudio } = require("../services/whisperService");
const { deleteFile } = require("../utils/deleteFile");
const path = require("path");

async function transcribe(req, res) {
  try {
    if (!req.file) {
      console.error("[ERROR] No file uploaded");
      return res.status(400).json({
        success: false,
        message: "No audio file provided",
      });
    }

    console.log("[UPLOAD] Processing file: " + req.file.filename);

    const absolutePath = path.resolve(req.file.path);
    let transcript = await transcribeAudio(absolutePath);
    
    if (transcript && transcript.trim().length < 4) {
      transcript = "";
    }
    
    await deleteFile(req.file.path);
    
    return res.status(200).json({
      success: true,
      transcript: transcript,
    });
  } catch (error) {
    console.error("[ERROR] Transcription failed:", error.message);

    if (req.file) {
      await deleteFile(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to transcribe audio",
    });
  }
}

module.exports = { transcribe };
