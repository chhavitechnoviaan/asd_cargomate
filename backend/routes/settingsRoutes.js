const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const router = express.Router();

const {

getSettings,
updateGeneral,
updatePreferences,
updateNotifications,
updateSecurity,
updateBilling,
updateTheme,
changePassword,
getActivity,
getAccountSummary,
uploadKYCDocuments,
submitKYC
} = require("../controllers/settingsController");
router.get("/", protect, getSettings);
router.put("/general", protect, updateGeneral);
router.put("/preferences", protect, updatePreferences);
router.put("/notifications", protect, updateNotifications);
router.put("/security", protect, updateSecurity);
router.put("/billing", protect, updateBilling);
router.put("/theme", protect, updateTheme);
router.put("/change-password", protect, changePassword);
router.get("/activity", protect, getActivity);
router.get("/account-summary", protect, getAccountSummary);
router.post(
  "/kyc-documents",
  protect,
  upload.array("documents", 20),
  uploadKYCDocuments
);
router.post(
  "/kyc-submit",
  protect,
  submitKYC
);

module.exports = router;