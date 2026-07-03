const aiService = require("../services/aiService");

// Controller for generating a summary from transcript
async function generateSummary(req, res, next) {
  try {
    const { transcript } = req.body;

    // Validation: Check if transcript exists
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[SUMMARY] Controller received request");

    // Call service layer
    const summary = await aiService.generateSummary(transcript);

    res.status(200).json({
      success: true,
      result: summary,
    });
  } catch (error) {
    console.error("[ERROR] Summary generation failed:", error.message);
    next({
      status: 500,
      message: error.message || "Failed to generate summary",
    });
  }
}

// Controller for extracting key points from transcript
async function generateKeyPoints(req, res, next) {
  try {
    const { transcript } = req.body;

    // Validation: Check if transcript exists
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[KEYPOINTS] Controller received request");

    // Call service layer
    const keyPoints = await aiService.extractKeyPoints(transcript);

    res.status(200).json({
      success: true,
      result: keyPoints,
    });
  } catch (error) {
    console.error("[ERROR] Key points extraction failed:", error.message);
    next({
      status: 500,
      message: error.message || "Failed to extract key points",
    });
  }
}

// Controller for extracting action items from transcript
async function generateActionItems(req, res, next) {
  try {
    const { transcript } = req.body;

    // Validation: Check if transcript exists
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[ACTIONITEMS] Controller received request");

    // Call service layer
    const actionItems = await aiService.extractActionItems(transcript);

    res.status(200).json({
      success: true,
      result: actionItems,
    });
  } catch (error) {
    console.error("[ERROR] Action items extraction failed:", error.message);
    next({
      status: 500,
      message: error.message || "Failed to extract action items",
    });
  }
}

// Controller for translating transcript to target language
async function translateTranscript(req, res, next) {
  try {
    const { transcript, targetLanguage } = req.body;

    // Validation: Check if transcript exists
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    // Validation: Check if targetLanguage exists
    if (
      !targetLanguage ||
      typeof targetLanguage !== "string" ||
      targetLanguage.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Target language is required and must be a non-empty string",
      });
    }

    console.log(
      `[TRANSLATE] Controller received request for ${targetLanguage}`,
    );

    // Call service layer
    const translation = await aiService.translateTranscript(
      transcript,
      targetLanguage,
    );

    res.status(200).json({
      success: true,
      result: translation,
    });
  } catch (error) {
    console.error("[ERROR] Translation failed:", error.message);
    next({
      status: 500,
      message: error.message || "Failed to translate transcript",
    });
  }
}

//Controller for analyzing emotion from transcript
async function analyzeEmotion(req, res, next) {
  try {
    const { transcript } = req.body;

    // Validation: Check if transcript exists
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[EMOTION] Controller received request");

    // Call service layer
    const emotionAnalysis = await aiService.generateEmotionAnalysis(transcript);

    res.status(200).json({
      success: true,
      result: emotionAnalysis,
    });
  } catch (error) {
    console.error("[EMOTION ERROR]", error.message);
    next({
      status: 500,
      message: error.message || "Failed to analyze emotion",
    });
  }
}

// Controller for generating meeting title
async function generateMeetingTitle(req, res, next) {
  try {
    const { transcript } = req.body;

    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[TITLE] Controller received request");

    const title = await aiService.generateMeetingTitle(transcript);

    res.status(200).json({
      success: true,
      result: title,
    });
  } catch (error) {
    console.error("[TITLE ERROR]", error.message);

    next({
      status: 500,
      message: error.message || "Failed to generate meeting title",
    });
  }
}

// Controller for sentiment analysis
async function analyzeSentiment(req, res, next) {
  try {
    const { transcript } = req.body;

    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required and must be a non-empty string",
      });
    }

    console.log("[SENTIMENT] Controller received request");

    const sentiment = await aiService.generateSentimentAnalysis(transcript);

    res.status(200).json({
      success: true,
      result: sentiment,
    });
  } catch (error) {
    console.error("[SENTIMENT ERROR]", error.message);

    next({
      status: 500,
      message: error.message || "Failed to analyze sentiment",
    });
  }
}

module.exports = {
  generateSummary,
  generateKeyPoints,
  generateActionItems,
  translateTranscript,
  analyzeEmotion,
  generateMeetingTitle,
  analyzeSentiment,
};
