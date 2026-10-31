const express = require("express");

const router = express.Router();

const quotationController =
  require(
    "../controllers/quotationController"
  );
const {protect} = require("../middleware/authMiddleware");

// Admin creates quotation
router.post(
  "/",
  quotationController.createQuotation
);


// Get quotations of shipment
router.get(
  "/shipment/:shipmentId",
  quotationController.getQuotationByShipment
);

router.get(
    "/my-quotations",
    protect,
    quotationController.getMySharedQuotations
  );
// Get single quotation
router.get(
  "/:id",
  quotationController.getQuotationById
);


// Admin shares quotation
router.put(
  "/:id/share",
  quotationController.shareQuotation
);


// B2B accepts quotation
router.put(
  "/:id/accept",protect,
  quotationController.acceptQuotation
);




// B2B rejects quotation
router.put(
  "/:id/reject",protect,
  quotationController.rejectQuotation
);


module.exports = router;