const fs = require("fs");
const groq = require("../config/groq");

async function transcribeAudio(filePath) {
  console.log("[WHISPER] Sending file to Groq: " + filePath);

  try {
    const audioStream = fs.createReadStream(filePath);

    const transcription = await groq.audio.transcriptions.create({
      file: audioStream,
      model: "whisper-large-v3",
    });

    console.log("[TRANSCRIPT] Transcription complete");
    console.log("[TRANSCRIPT] Text length: " + transcription.text.length);

    return transcription.text;
  } catch (error) {
    console.error("[ERROR] Groq API error:", error.message);
    throw new Error("Failed to transcribe audio: " + error.message);
  }
}

module.exports = { transcribeAudio };
