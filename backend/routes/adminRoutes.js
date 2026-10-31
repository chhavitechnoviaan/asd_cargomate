const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

router.get("/dashboard", protect, adminOnly, adminController.getDashboard);

module.exports = router;