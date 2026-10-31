
const express = require("express");
const router = express.Router();
const notice = require("../controllers/noticeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, notice.createNotice);
router.get("/", protect, notice.getNotices);

module.exports = router;