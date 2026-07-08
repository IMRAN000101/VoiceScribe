const multer = require("multer");
const fs = require("path");
const path = require("path");

const ALLOWED_MIME_TYPES = [
  "audio/webm",
  "audio/wav",
  "audio/mpeg",
  "audio/mp3",
];
const MAX_FILE_SIZE = 25 * 1024 * 1024;

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `audio_${timestamp}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("[UPLOAD] File received: " + file.originalname);
  console.log("[UPLOAD] MIME type: " + file.mimetype);
  console.log("[UPLOAD] Size: " + file.size + " bytes");

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    console.error("[ERROR] Invalid file type: " + file.mimetype);
    return cb(new Error("Invalid file type. Only audio files are allowed."));
  }

  if (file.size > MAX_FILE_SIZE) {
    console.error("[ERROR] File too large: " + file.size + " bytes");
    return cb(new Error("File size exceeds 25MB limit."));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = upload;
