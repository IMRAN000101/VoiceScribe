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

async function generateEmotionAnalysis(transcript) {
  console.log("[EMOTION] Starting emotion analysis");

  const prompt = `
You are an expert emotion analysis engine.

Analyze the following meeting transcript.

Identify the overall emotions expressed throughout the conversation.
When determining the dominant emotion, prioritize emotionally significant statements over purely informational content.

If a strong emotional statement appears, reflect that appropriately in the dominant emotion and confidence score.

Do not simply choose "Neutral" because most of the transcript is factual.

Return ONLY valid JSON.

Use exactly this format:

{
  "dominantEmotion": "Neutral",
  "confidence": 87,
  "reason": "Short explanation",
  "emotions": [
    {
      "name": "Neutral",
      "percentage": 87
    },
    {
      "name": "Happy",
      "percentage": 8
    },
    {
      "name": "Excited",
      "percentage": 5
    }
  ]
}

Rules:
- Allowed emotions:
Happy
Neutral
Sad
Angry
Excited
Frustrated
Confused
Concerned
Motivated

- Confidence must be between 0 and 100.
- Percentages must total exactly 100.
- Return ONLY JSON.
- Do not include markdown.
- Do not include code fences.
- Do not include explanations outside the JSON.

Transcript:
${transcript} `;

  const response = await generateAIResponse(prompt);
  console.log("[EMOTION] Emotion analysis genereated successfully");

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleanedResponse);
}

// Generate a meeting title from the transcript
async function generateMeetingTitle(transcript) {
  console.log("[TITLE] Generating meeting title");

  const prompt = `
You are an expert meeting assistant.

Generate a short, professional meeting title.

Rules:
- Maximum 6 words.
- Do not use quotation marks.
- Do not include punctuation at the end.
- Do not include words like "Meeting" unless they naturally fit.
- Return ONLY the title.

Examples:

Sprint Planning

Client Requirement Discussion

Weekly Team Stand-up

Technical Interview

Project Deadline Review

Manager Feedback Session

Transcript:
${transcript}
`;

  const title = await generateAIResponse(prompt);

  console.log("[TITLE] Meeting title generated");

  return title.trim();
}

//Generate Sentiment Analysis from the transcript
async function generateSentimentAnalysis(transcript) {
  console.log("[SENTIMENT] Starting sentiment analysis");

  const prompt = `
You are an expert sentiment analysis engine.

Analyze the overall sentiment of the following meeting transcript.

Return ONLY valid JSON.

Use exactly this format:

{
  "sentiment": "Positive",
  "confidence": 92,
  "reason": "Brief explanation of why this sentiment was chosen."
}

Rules:
- Allowed sentiments:
Positive
Neutral
Negative

- Confidence must be between 0 and 100.
- Return ONLY JSON.
- Do not use markdown.
- Do not include code fences.
- Do not include any explanation outside the JSON.

Transcript:
${transcript}
`;

  const response = await generateAIResponse(prompt);

  const cleanedResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("[SENTIMENT] Analysis completed");

  return JSON.parse(cleanedResponse);
}

module.exports = {
  generateAIResponse,
  generateSummary,
  extractKeyPoints,
  extractActionItems,
  translateTranscript,
  generateEmotionAnalysis,
  generateMeetingTitle,
  generateSentimentAnalysis,
};
