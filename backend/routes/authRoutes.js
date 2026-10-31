const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/signup-user", auth.signupUser);
router.post("/signup-b2b", auth.signupB2B);
router.post("/login", auth.login);

router.post("/send-otp", auth.sendOtp);
router.post("/verify-otp", auth.verifyOtp);
router.post("/resend-otp", auth.resendOtp);
router.post("/reset-password", auth.resetPassword);

router.post("/create-staff", protect, adminOnly, auth.createStaff);
router.get("/me", protect, auth.me);

module.exports = router;