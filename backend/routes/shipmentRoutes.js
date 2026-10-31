const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const shipmentController = require("../controllers/shipmentController");
const { protect , adminOnly} = require("../middleware/authMiddleware");
router.post("/step1", protect, require("../middleware/subscriptionLimit")("shipmentPlanning"), shipmentController.saveStep1);
router.put("/step2/:id", protect, shipmentController.saveStep2);
router.put("/step3/:id", protect, shipmentController.saveStep3);
router.post(
  "/upload-docs",
  protect,
  upload.single("file"),
  shipmentController.uploadDocs
);
router.get("/", protect, shipmentController.getShipments);
router.get("/stats", protect, shipmentController.getStats);
router.patch(
  "/:id/status",
  protect,
  shipmentController.updateShipmentStatus
);
router.patch("/:id/save-draft", protect, shipmentController.saveDraft);

router.post("/:id/analyze", protect, require("../middleware/subscriptionLimit")("shipmentCost"), shipmentController.analyzeShipment);

router.post("/:id/submit", protect, shipmentController.submitShipment);
router.get("/:id/details", protect, shipmentController.getShipmentDetails);

router.post(
    "/:id/approve",
    protect,
    adminOnly,
    shipmentController.approveShipment
  );
  
  router.post(
    "/:id/reject",
    protect,
    adminOnly,
    shipmentController.rejectShipment
  );
  
  router.post(
    "/:id/hold",
    protect,
    adminOnly,
    shipmentController.holdShipment
  );

router.get(
    "/admin/all",
    protect,
    adminOnly,
    shipmentController.getAllShipmentsForAdmin
  );


  router.post(
    "/:id/assign-carrier",
    protect,
    adminOnly,
    shipmentController.assignCarrier
);
router.get("/:id/tracking",protect,shipmentController.getShipmentTracking);
router.post(
  "/:id/tracking",
  protect,
  adminOnly,
  shipmentController.addTrackingUpdate
);

module.exports = router;