const fs = require("fs");
const openai = require("../config/openai");

async function transcribeAudio(filePath) {
  console.log("[WHISPER] Sending file to OpenAI: " + filePath);

  try {
    const audioBuffer = fs.createReadStream(filePath);

    const response = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: "whisper-1",
    });

    console.log("[TRANSCRIPT] Transcription complete");
    console.log("[TRANSCRIPT] Text length: " + response.text.length);

    return response.text;
  } catch (error) {
    console.error("[ERROR] Whisper API error:", error.message);
    throw new Error("Failed to transcribe audio: " + error.message);
  }
}

module.exports = { transcribeAudio };
