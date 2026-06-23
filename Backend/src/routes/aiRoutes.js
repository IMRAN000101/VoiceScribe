const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

// POST /api/ai/summary - Generate a summary from transcript
router.post('/ai/summary', aiController.generateSummary);

// POST /api/ai/keypoints - Extract key points from transcript
router.post('/ai/keypoints', aiController.generateKeyPoints);

// POST /api/ai/actionitems - Extract action items from transcript
router.post('/ai/actionitems', aiController.generateActionItems);

// POST /api/ai/translate - Translate transcript to target language
router.post('/ai/translate', aiController.translateTranscript);

module.exports = router;
