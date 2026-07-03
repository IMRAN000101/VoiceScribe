const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/userController");
const { changePassword } = require("../controllers/userController");

router.get("/profile", auth, getProfile);
router.put("/change-password", auth, changePassword);

module.exports = router;
