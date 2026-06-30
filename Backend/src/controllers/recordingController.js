const Recording = require("../models/Recording");

//Create Recording
const createRecording = async (req, res) => {
  try {
    const {
      title,
      transcript,
      summary,
      keyPoints,
      actionItems,
      translatedText,
      audioUrl,
    } = req.body;
    const recording = await Recording.create({
      user: req.user.id,
      title,
      transcript,
      summary,
      keyPoints,
      actionItems,
      translatedText,
      audioUrl,
    });

    res.status(201).json({
      success: true,
      message: "Recording created Successfully",
      recording,
    });
  } catch (error) {
    console.error("Create Recording Error", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Get all Recordings
const getRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: recordings.length,
      recordings,
    });
  } catch (error) {
    console.error("Get Recordings Error", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Get single Recording
const getRecordingById = async (req, res) => {
  try {
    const recording = await Recording.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!recording) {
      return res.status(404).json({
        success: false,
        message: "Recording not found",
      });
    }
    res.status(200).json({
      success: true,
      recording,
    });
  } catch (error) {
    console.error("Get Recording Error", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//update Recording
const updateRecording = async (req, res) => {
  try {
    const recording = await Recording.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!recording) {
      return res.status(404).json({
        success: false,
        message: "Recording not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recording Updated Successfully",
      recording,
    });
  } catch (error) {
    console.error("Update Recording Error", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//Delete Recording
const deleteRecording = async (req, res) => {
  try {
    const recording = await Recording.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!recording) {
      return res.status(404).json({
        success: false,
        message: "Recording not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recording deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Recording Error", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
};
