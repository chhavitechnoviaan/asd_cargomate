const express = require("express");

const router = express.Router();

const {
  getB2BUsers,
  getB2BUserById,
  getB2BUserStats,
  approveKYC,
  rejectKYC,
  suspendB2BUser,
} = require("../controllers/vendorController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// B2B Users

router.get("/", protect, adminOnly, getB2BUsers);

router.get("/stats/all", protect, adminOnly, getB2BUserStats);

router.get("/:id", protect, adminOnly, getB2BUserById);

router.patch("/:id/suspend", protect, adminOnly, suspendB2BUser);

// KYC

router.patch("/:userId/kyc/approve", protect, adminOnly, approveKYC);

router.patch("/:userId/kyc/reject", protect, adminOnly, rejectKYC);

module.exports = router;