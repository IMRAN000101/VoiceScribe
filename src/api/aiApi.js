import api from "./axios";

export async function generateSummary(transcript) {
  return api.post("/ai/summary", { transcript });
}

export async function generateKeyPoints(transcript) {
  return api.post("/ai/keypoints", { transcript });
}

export async function generateActionItems(transcript) {
  return api.post("/ai/actionitems", { transcript });
}

export async function translateTranscript(transcript, targetLanguage) {
  return api.post("/ai/translate", {
    transcript,
    targetLanguage,
  });
}

export async function generateEmotionAnalysis(transcript) {
  return api.post("/ai/emotion", {
    transcript,
  });
}

export async function generateMeetingTitle(transcript) {
  return api.post("/ai/title", {
    transcript,
  });
}

export async function generateSentimentAnalysis(transcript) {
  return api.post("/ai/sentiment", {
    transcript,
  });
}
