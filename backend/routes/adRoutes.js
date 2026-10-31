const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const cloudinary = require("../config/cloudinary");
const ctrl = require("../controllers/adController");

// Ad images are uploaded directly to Cloudinary; no local disk copy is created.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, and GIF image files are allowed."));
    }
    cb(null, true);
  },
});

function uploadAdImage(req, res, next) {
  upload.single("file")(req, res, (multerError) => {
    if (multerError) {
      const message = multerError.code === "LIMIT_FILE_SIZE"
        ? "Image must be 10 MB or smaller."
        : multerError.message || "Unable to read ad image.";
      return res.status(400).json({ status: 0, message });
    }

    if (!req.file) return next();

    const extension = (path.extname(req.file.originalname || "").replace(".", "") || "jpg").toLowerCase();
    const safeExtension = ["jpg", "jpeg", "png", "webp", "gif"].includes(extension) ? extension : "jpg";
    const publicId = `ad-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "asd/ads",
        resource_type: "image",
        public_id: publicId,
        format: safeExtension,
        overwrite: false,
        use_filename: false,
        unique_filename: false,
      },
      (cloudinaryError, result) => {
        if (cloudinaryError) {
          console.error("Cloudinary ad image upload failed:", cloudinaryError.message);
          return res.status(502).json({
            status: 0,
            message: "Image upload to Cloudinary failed. Check Cloudinary credentials and try again.",
          });
        }

        req.file.path = result.secure_url;
        req.file.filename = result.public_id;
        req.file.cloudinaryPublicId = result.public_id;
        req.file.cloudinaryUrl = result.secure_url;
        next();
      }
    );

    stream.end(req.file.buffer);
  });
}

// Public endpoint used by dashboard placements.
router.get("/placement", ctrl.getAdsByLocation);
router.post("/", uploadAdImage, ctrl.createAd);
router.get("/", ctrl.getAds);
router.put("/:id", ctrl.updateAd);
router.delete("/:id", ctrl.deleteAd);
router.post("/duplicate/:id", ctrl.duplicateAd);
router.post("/status/:id", ctrl.changeStatus);
router.post("/priority", ctrl.updatePriority);
router.get("/preview/:id", ctrl.getAdPreview);
router.get("/stats", ctrl.getStats);
router.get("/performance", ctrl.getPerformance);
router.get("/analytics", ctrl.getAnalytics);

module.exports = router;
