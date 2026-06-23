const groq = require("../config/groq");

// Helper function to generate AI responses using Groq Llama 3.3 70B
// This is the internal helper that all AI features use
async function generateAIResponse(prompt) {
  try {
    console.log("[AI] Calling Groq Llama 3.3 70B");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    });

    const responseText = response.choices?.[0]?.message?.content || "";

    console.log("[AI] Response generated successfully");
    return responseText.trim();
  } catch (error) {
    console.error("[ERROR] AI response generation failed:", error.message);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

// Generate a concise summary of the transcript
async function generateSummary(transcript) {
  console.log("[SUMMARY] Starting summary generation");

  const prompt = `You are an expert meeting assistant.

Generate a concise summary of the following transcript.

Return your response as:
* 3 to 6 bullet points
* Use professional language
* Keep the format concise

Transcript:
${transcript}`;

  const summary = await generateAIResponse(prompt);
  console.log("[SUMMARY] Summary generated successfully");
  return summary;
}

// Extract key discussion points from the transcript
async function extractKeyPoints(transcript) {
  console.log("[KEYPOINTS] Starting key points extraction");

  const prompt = `You are an expert meeting assistant.

Extract the most important discussion points from the following transcript.

Return your response as:
* A bullet list only
* No explanations
* No numbering

Transcript:
${transcript}`;

  const keyPoints = await generateAIResponse(prompt);
  console.log("[KEYPOINTS] Key points extracted successfully");
  return keyPoints;
}

// Extract actionable tasks from the transcript
async function extractActionItems(transcript) {
  console.log("[ACTIONITEMS] Starting action items extraction");

  const prompt = `You are an expert project manager.

Extract actionable tasks from the following transcript.

Return your response as:
* Checklist style (use checkboxes: [ ])
* Clear action descriptions
* Concise wording

Transcript:
${transcript}`;

  const actionItems = await generateAIResponse(prompt);
  console.log("[ACTIONITEMS] Action items extracted successfully");
  return actionItems;
}

// Translate transcript to target language
async function translateTranscript(transcript, targetLanguage) {
  console.log(`[TRANSLATE] Starting translation to ${targetLanguage}`);

  const prompt = `You are a professional translator.

Translate the following transcript into ${targetLanguage}.

Requirements:
* Preserve the original meaning
* Preserve context and nuance
* Preserve speaker intent
* Ensure natural and fluent translation
* Return ONLY the translated text with no additional commentary

Transcript:
${transcript}`;

  const translation = await generateAIResponse(prompt);
  console.log(
    `[TRANSLATE] Translation to ${targetLanguage} completed successfully`,
  );
  return translation;
}

module.exports = {
  generateAIResponse,
  generateSummary,
  extractKeyPoints,
  extractActionItems,
  translateTranscript,
};
