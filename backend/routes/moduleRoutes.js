const router = require("express").Router();
const ctrl = require("../controllers/moduleController");
const upload = require("../utils/fileUpload");

router.post("/create", ctrl.createModule);
router.get("/stats", ctrl.getStats);
router.get("/installed", ctrl.getInstalledModules);
router.get("/marketplace", ctrl.getMarketplaceModules);
router.post("/install", ctrl.installModule);
router.put("/toggle/:id", ctrl.toggleModule);
router.delete("/:id", ctrl.deleteModule);
router.put("/config/:id", ctrl.updateConfig);
router.post("/upload", upload.single("file"), ctrl.uploadModule);

module.exports = router;