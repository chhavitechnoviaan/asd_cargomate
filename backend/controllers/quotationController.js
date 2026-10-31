const Quotation = require("../models/quotation");
const Shipment = require("../models/Shipment");


// ================================
// CREATE QUOTATION
// ================================
exports.createQuotation = async (req, res) => {
  try {
    const {
        shipmentId,
        charges,
        discount,
        tax,
        currency,
        validFrom,
        validUntil,
        quoteVersion,
        freightQuote,
        notes,
        termsAndConditions,
      } = req.body;

    console.log("========== CREATE QUOTATION ==========");
    console.log("Request Body:", req.body);

    // Check shipment
    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    // Calculate subtotal
    const subtotal = (charges || []).reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );

    const totalAmount =
    subtotal -
    Number(discount || 0) +
    Number(tax || 0);

    // Generate quotation number
    const quotationNumber =
      `QT-${Date.now()}`;

    const quotation =
      await Quotation.create({
        shipmentId,

        quotationNumber,

        charges,

        subtotal,

        tax: tax || 0,

        totalAmount,

        currency: currency || "USD",

        validUntil,

        notes,

        status: "Draft",

        createdBy: req.user?._id || null,

        discount: discount || 0,
validFrom,
quoteVersion,
freightQuote: freightQuote || 0,
termsAndConditions,
      });

    console.log(
      "QUOTATION CREATED:",
      quotation
    );

    console.log(
      "========== CREATE QUOTATION END =========="
    );

    return res.status(201).json({
      success: true,
      message: "Quotation created successfully",
      data: quotation,
    });

  } catch (error) {

    console.error(
      "CREATE QUOTATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create quotation",
      error: error.message,
    });
  }
};



// ================================
// GET QUOTATION BY SHIPMENT
// ================================
exports.getQuotationByShipment =
  async (req, res) => {
    try {

      const { shipmentId } = req.params;

      const quotations =
        await Quotation.find({
          shipmentId,
        })
          .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: quotations,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Failed to fetch quotations",
        error: error.message,
      });
    }
  };



// ================================
// GET SINGLE QUOTATION
// ================================
exports.getQuotationById =
  async (req, res) => {
    try {

      const quotation =
        await Quotation.findById(
          req.params.id
        )
          .populate("shipmentId");

      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: quotation,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Failed to fetch quotation",
        error: error.message,
      });
    }
  };



// ================================
// SHARE QUOTATION
// ================================
exports.shareQuotation = async (req, res) => {
    try {
      const quotation = await Quotation.findById(req.params.id);
  
      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }
  
      if (quotation.status === "Shared") {
        return res.status(400).json({
          success: false,
          message: "Quotation is already shared",
        });
      }
  
      quotation.status = "Shared";
      quotation.sharedAt = new Date();
  
      await quotation.save();
  
      return res.status(200).json({
        success: true,
        message: "Quotation shared with B2B successfully",
        data: quotation,
      });
  
    } catch (error) {
      console.error("SHARE QUOTATION ERROR:", error);
  
      return res.status(500).json({
        success: false,
        message: "Failed to share quotation",
        error: error.message,
      });
    }
  };


 // ================================
// GET MY SHARED QUOTATIONS - B2B
// ================================
exports.getMySharedQuotations = async (req, res) => {
    try {
      const userId = req.user?._id;
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
      }
  
      const quotations = await Quotation.find({
        status: "Shared",
      })
        .populate({
          path: "shipmentId",
          match: {
            userId: userId,
          },
        })
        .sort({ createdAt: -1 });
  
      // Sirf wahi quotations rakho
      // jinki shipment logged-in B2B user ki hai
      const userQuotations = quotations.filter(
        (quotation) => quotation.shipmentId
      );
  
      return res.status(200).json({
        success: true,
        message: "Shared quotations fetched successfully",
        data: userQuotations,
      });
  
    } catch (error) {
      console.error(
        "GET MY SHARED QUOTATIONS ERROR:",
        error
      );
  
      return res.status(500).json({
        success: false,
        message: "Failed to fetch shared quotations",
        error: error.message,
      });
    }
  }; 


// ================================
// ACCEPT QUOTATION
// ================================
exports.acceptQuotation =
  async (req, res) => {
    try {

      const quotation =
        await Quotation.findById(
          req.params.id
        );

      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      if (
        quotation.status !== "Shared"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only shared quotations can be accepted",
        });
      }

      quotation.status = "Accepted";

      quotation.acceptedAt =
        new Date();

      await quotation.save();

      return res.status(200).json({
        success: true,
        message:
          "Quotation accepted successfully",
        data: quotation,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Failed to accept quotation",
        error: error.message,
      });
    }
  };



// ================================
// REJECT QUOTATION
// ================================
exports.rejectQuotation =
  async (req, res) => {
    try {

      const {
        rejectionReason,
      } = req.body;

      const quotation =
        await Quotation.findById(
          req.params.id
        );

      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      if (
        quotation.status !== "Shared"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only shared quotations can be rejected",
        });
      }

      quotation.status = "Rejected";

      quotation.rejectionReason =
        rejectionReason || "";

      quotation.rejectedAt =
        new Date();

      await quotation.save();

      return res.status(200).json({
        success: true,
        message:
          "Quotation rejected successfully",
        data: quotation,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Failed to reject quotation",
        error: error.message,
      });
    }
  };