const mongoose = require("mongoose");

const RecordingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    transcript: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    keyPoints: [
      {
        type: String,
      },
    ],
    actionItems: [
      {
        type: String,
      },
    ],
    translatedText: {
      type: String,
      trim: true,
    },
    audioUrl: {
      type: String,
    },
    emotionAnalysis: {
      dominantEmotion: {
        type: String,
        enum: [
          "Happy",
          "Neutral",
          "Sad",
          "Angry",
          "Excited",
          "Frustrated",
          "Confused",
          "Concerned",
          "Motivated",
        ],
        default: "Neutral",
      },
      confidence: {
        type: Number,
        defautl: 0,
      },
      reason: {
        type: String,
        defautl: "",
      },
      emotions: {
        type: [
          {
            name: String,
            percentage: Number,
          },
        ],
        default: [],
      },
    },
    sentimentAnalysis: {
      sentiment: {
        type: String,
        enum: ["Positive", "Neutral", "Negative"],
        default: "Neutral",
      },
      confidence: {
        type: Number,
        default: 0,
      },
      reason: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Recording", RecordingSchema);
