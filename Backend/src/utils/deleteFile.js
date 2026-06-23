const fs = require("fs").promises;
const path = require("path");

async function deleteFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    await fs.unlink(absolutePath);
    console.log("[CLEANUP] File deleted: " + absolutePath);
  } catch (error) {
    console.error("[ERROR] Failed to delete file:", error.message);
  }
}

module.exports = { deleteFile };
