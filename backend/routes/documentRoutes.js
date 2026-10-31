const express = require("express");
const router = express.Router();

const documentController = require("../controllers/documentController");
const upload = require("../middleware/upload");

const { protect } = require("../middleware/authMiddleware");
router.get(
    "/dashboard",
    protect,
    documentController.getDashboard
);
router.get(
    "/",
    protect,
    documentController.getDocuments
);
router.get(
    "/recent",
    protect,
    documentController.getRecentUploads
);
router.get(
    "/storage",
    protect,
    documentController.getStorage
);
router.get(
    "/expiring",
    protect,
    documentController.getExpiringDocuments
);
router.post(
    "/upload",
    protect,
    upload.single("file"),
    documentController.uploadDocument
);
router.get(
    "/:id/download",
    protect,
    documentController.downloadDocument
);
router.delete(
    "/:id",
    protect,
    documentController.deleteDocument
);

module.exports = router;