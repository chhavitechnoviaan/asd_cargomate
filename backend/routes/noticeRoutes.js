const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/active", protect, controller.getActiveNotice);
router.get("/", protect, controller.getNotices);
router.get("/:id", protect, controller.getNotice);

router.post("/", protect, adminOnly, upload.single("image"), controller.createNotice);
router.put("/:id", protect, adminOnly, upload.single("image"), controller.updateNotice);
router.delete("/:id", protect, adminOnly, controller.deleteNotice);
router.patch("/:id/toggle", protect, adminOnly, controller.toggleNoticeStatus);

module.exports = router;
