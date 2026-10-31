const express = require("express");
const router = express.Router();

const {
    getProfile,
    updateProfile,
    uploadProfileImage,
    changePassword,
    getPreferences,
    updatePreferences,
    getLoginSessions,
    getAccountActivities,
    getProfileCompletion
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getProfile);

router.put("/", protect, updateProfile);

router.post("/image", protect, uploadProfileImage);

router.put("/password", protect, changePassword);

router.get("/preferences", protect, getPreferences);

router.put("/preferences", protect, updatePreferences);

router.get("/sessions", protect, getLoginSessions);

router.get("/activity", protect, getAccountActivities);

router.get("/completion", protect, getProfileCompletion);

module.exports = router;