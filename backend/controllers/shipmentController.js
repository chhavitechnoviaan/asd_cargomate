const Shipment = require("../models/Shipment");
const ShipmentTracking = require("../models/ShipmentTracking");
const ShipmentDocument = require("../models/ShipmentDocument");
const ShipmentParty = require("../models/ShipmentParty");
const ShipmentCost = require("../models/ShipmentCost");
const Activity = require("../models/Activity");
const {
  shipmentStatusFlow,
  canMoveToStatus
} = require("../utils/shipmentStatusFlow");

exports.saveStep1 = async (req, res) => {
  try {

    const {
      exporter,
      shipmentType,
      shipmentMode,
      shipmentPurpose,
      customerType
    } = req.body;

    const referenceNumber = `REF-${Date.now()}`;
    const sbNumber = `SB-${Date.now()}`;

    const shipment = await Shipment.create({

      userId: req.user._id,

      createdByRole: req.user.role,

      customerType: customerType || "Individual",

      shipmentType,

      shipmentMode,

      shipmentPurpose,

      exporter,

      referenceNumber,

      sbNumber,

      shipmentStatus: "Draft",

      approvalStatus: "Pending",

      documentStatus: "Pending",

      trackingStatus: "Not Started",

      paymentStatus: "Pending",

      exceptionStatus: "None",

      currentStep: 2

    });
    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_CREATED",

      message: `Shipment ${shipment.referenceNumber} created successfully.`,

      meta: {
        createdByRole: req.user.role,
        shipmentStatus: shipment.shipmentStatus
      }

    });

    return res.status(201).json({
      status: 1,
      message: "Shipment created successfully.",
      data: shipment
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.saveStep2 = async (req, res) => {
  try {

    const shipment = await Shipment.findByIdAndUpdate(

      req.params.id,

      {
        route: req.body.route,

        importer: req.body.importer,

        eta: req.body.eta,

        etd: req.body.etd,

        incoterm: req.body.incoterm,

        currentStep: 3
      },

      {
        new: true,
        runValidators: true
      }

    );

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_UPDATED",

      message: "Origin & Destination details updated.",

      meta: {
        step: 2
      }

    });

    return res.json({

      status: 1,

      message: "Step 2 completed.",

      data: shipment

    });

  } catch (error) {

    return res.status(500).json({

      status: 0,

      message: error.message

    });

  }
};
  
exports.saveStep3 = async (req, res) => {
  try {

    const shipment = await Shipment.findByIdAndUpdate(

      req.params.id,

      {

        cargo: req.body.cargo,

        amount: req.body.amount,

        paymentTerms: req.body.paymentTerms,

        insuranceRequired: req.body.insuranceRequired,

        currency: req.body.currency,

        additionalInformation: req.body.additionalInformation,

        currentStep: 4

      },

      {
        new: true,
        runValidators: true
      }

    );

    if (!shipment) {

      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });

    }

    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_UPDATED",

      message: "Cargo & Invoice details updated.",

      meta: {
        step: 3
      }

    });

    return res.json({

      status: 1,

      message: "Step 3 completed.",

      data: shipment

    });

  } catch (error) {

    return res.status(500).json({

      status: 0,

      message: error.message

    });

  }
};


exports.saveDraft = async (req, res) => {
  try {

    const shipment = await Shipment.findByIdAndUpdate(

      req.params.id,

      {
        shipmentStatus: "Draft",
        lastStatusUpdatedAt: new Date()
      },

      { new: true }

    );

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_UPDATED",
      message: "Shipment saved as draft.",
      meta: {
        shipmentStatus: shipment.shipmentStatus
      }
    });

    return res.json({
      status: 1,
      message: "Draft saved successfully.",
      data: shipment
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.analyzeShipment = async (req, res) => {
  try {

    const shipment = await Shipment.findById(req.params.id)
      .populate("cargo.hsCode");

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "AI_QUERY",
      message: "Shipment analyzed by AI.",
      meta: {}
    });

    return res.json({
      status: 1,
      message: "Shipment analyzed successfully.",
      data: {
        riskLevel: "Low",
        freightEstimate: shipment.amount || 0,
        estimatedTransit: shipment.transitTime || "7-10 Days",
        requiredDocuments: [
          "Commercial Invoice",
          "Packing List",
          "Bill of Lading"
        ]
      }
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.submitShipment = async (req, res) => {

  try {

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {

      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });

    }

    if (!canMoveToStatus(shipment.shipmentStatus, "Submitted")) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Submitted"`
      });
    }
    
    shipment.shipmentStatus = "Submitted";
    shipment.approvalStatus = "Pending";
    shipment.currentStep = 5;
    shipment.lastStatusUpdatedAt = new Date();

    shipment.statusHistory.push({
      status: "Submitted",
      updatedBy: req.user._id,
      remarks: "Shipment submitted for approval"
    });

    await shipment.save();

    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_SUBMITTED",

      message: "Shipment submitted for admin approval.",

      meta: {
        approvalStatus: "Pending"
      }

    });

    return res.json({

      status: 1,

      message: "Shipment submitted successfully.",

      data: shipment

    });

  } catch (error) {

    return res.status(500).json({

      status: 0,

      message: error.message

    });

  }

};

exports.approveShipment = async (req, res) => {
  try {

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.approvalStatus = "Approved";
    if (!canMoveToStatus(shipment.shipmentStatus, "Approved")) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Approved"`
      });
    }
    
    shipment.shipmentStatus = "Approved";
    shipment.approvedAt = new Date();
    shipment.lastStatusUpdatedAt = new Date();

    shipment.statusHistory.push({
      status: "Approved",
      updatedBy: req.user._id,
      remarks: "Shipment approved"
    });

    await shipment.save();

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_APPROVED",
      message: "Shipment approved by admin.",
      meta: {
        approvedBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment approved successfully.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.rejectShipment = async (req, res) => {

  try {

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.approvalStatus = "Rejected";

    shipment.lastStatusUpdatedAt = new Date();
    shipment.statusHistory.push({
      status: shipment.shipmentStatus,
      updatedBy: req.user._id,
      remarks: req.body.reason || "Shipment rejected by admin"
    });
    
    await shipment.save();


    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_REJECTED",
      message: "Shipment rejected by admin.",
      meta: {
        reason: req.body.reason || "",
        rejectedBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment rejected successfully.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }

};

exports.holdShipment = async (req, res) => {

  try {

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.approvalStatus = "Correction Required";

    shipment.exceptionStatus = "On Hold";
    
    shipment.lastStatusUpdatedAt = new Date();
    
    shipment.statusHistory.push({
      status: shipment.shipmentStatus,
      updatedBy: req.user._id,
      remarks: req.body.reason || "Shipment placed on hold"
    });

    shipment.lastStatusUpdatedAt = new Date();

    

    await shipment.save();

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_ON_HOLD",
      message: "Shipment put on hold.",
      meta: {
        reason: req.body.reason || "",
        holdBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment placed on hold.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }

};

exports.getAllShipmentsForAdmin = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      search,
      shipmentStatus,
      approvalStatus,
      shipmentMode,
      shipmentType
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          referenceNumber: {
            $regex: search,
            $options: "i"
          }
        },
        {
          sbNumber: {
            $regex: search,
            $options: "i"
          }
        },
        {
          "exporter.companyName": {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (shipmentStatus)
      query.shipmentStatus = shipmentStatus;

    if (approvalStatus)
      query.approvalStatus = approvalStatus;

    if (shipmentMode)
      query.shipmentMode = shipmentMode;

    if (shipmentType)
      query.shipmentType = shipmentType;

    const total = await Shipment.countDocuments(query);

    const shipments = await Shipment.find(query)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({

      status: 1,

      total,

      page: Number(page),

      totalPages: Math.ceil(total / limit),

      data: shipments

    });

  } catch (err) {

    return res.status(500).json({

      status: 0,

      message: err.message

    });

  }
};

exports.assignCarrier = async (req, res) => {
  try {

    const {
      name,
      code,
      contactPerson,
      mobile,
      email
    } = req.body;

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.carrier = {
      name,
      code,
      contactPerson,
      mobile,
      email
    };

    shipment.assignedCarrierAt = new Date();
    shipment.assignedBy = req.user._id;

    if (!canMoveToStatus(shipment.shipmentStatus, "Carrier Assigned")) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Carrier Assigned"`
      });
    }
    
    shipment.shipmentStatus = "Carrier Assigned";
    shipment.lastStatusUpdatedAt = new Date();
    shipment.statusHistory.push({
      status: "Carrier Assigned",
      updatedBy: req.user._id,
      remarks: "Carrier assigned"
    });

    await shipment.save();

    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_STATUS_CHANGED",

      message: "Carrier assigned successfully.",

      meta: {
        carrier: shipment.carrier
      }

    });

    return res.json({

      status: 1,

      message: "Carrier assigned successfully.",

      data: shipment

    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.uploadDocs = async (req, res) => {
  try {

    const { shipmentId, documentType, required } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: 0,
        message: "Please upload a file."
      });
    }

    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found."
      });
    }

    const document = await ShipmentDocument.create({
      shipmentId,
    
      documentName: documentType,
    
      documentType: required === "true"
        ? "Required"
        : "If Applicable",
    
      status: "Uploaded",
    
      fileUrl: `/uploads/documents/${req.file.filename}`,
    
      fileName: req.file.originalname,
    
      fileSize: req.file.size.toString(),
    
      uploadedBy: req.user._id,
    
      required: required === "true"
    });

    await Activity.create({
      userId: req.user._id,
      shipmentId,
      type: "DOCUMENT_UPLOADED",
      message: `${documentType} uploaded successfully.`
    });

    return res.status(200).json({
      status: 1,
      message: "Document uploaded successfully.",
      data: document
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.getShipments = async (req, res) => {
    const { status, mode, search } = req.query;
  
    let query = {
      userId: req.user._id
    };
    if (status)
    query.shipmentStatus = status;
    if (mode) query["route.mode"] = mode;
  
    if (search) {
      query.$or = [
        { sbNumber: { $regex: search, $options: "i" } },
        { "exporter.companyName": { $regex: search, $options: "i" } }
      ];
    }
  
    const data = await Shipment.find(query)
      .populate("cargo.hsCode")
      .sort({ createdAt: -1 });
  
    res.json({ status: 1, data });
  };

  exports.getStats = async (req, res) => {

    const total = await Shipment.countDocuments();
  
    const inTransit = await Shipment.countDocuments({
      shipmentStatus:"In Transit"
    });
  
    const delivered = await Shipment.countDocuments({
      shipmentStatus:"Delivered"
    });
  
    const pendingDocs = await Shipment.countDocuments({
      documentStatus:"Pending"
    });
  
    const customHold = await Shipment.countDocuments({
      exceptionStatus:"On Hold"
    });
  
    const revenueAgg = await Shipment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$revenue" }
        }
      }
    ]);
  
    res.json({
      status: 1,
      data: {
        total,
        inTransit,
        delivered,
        pendingDocs,
        customHold,
        revenue: revenueAgg[0]?.total || 0
      }
    });
  };

  exports.updateShipmentStatus = async (req, res) => {

    try {

        const shipment = await Shipment.findById(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                status: 0,
                message: "Shipment not found"
            });
        }

        
        const currentStatus = shipment.shipmentStatus;
        const nextStatus = req.body.status;

        if (!canMoveToStatus(currentStatus, nextStatus)) {
          return res.status(400).json({
            status: 0,
            message: `Invalid transition from ${currentStatus} to ${nextStatus}`
          });
        }

            if (
              nextStatus === "Approved" &&
              req.user.role !== "admin"
          ) {
              return res.status(403).json({
                  status: 0,
                  message: "Only admin can approve shipments."
              });
          }


    

        shipment.shipmentStatus = nextStatus;
        shipment.lastStatusUpdatedAt = new Date();

        await shipment.save();

        await Activity.create({

            userId: req.user._id,

            shipmentId: shipment._id,

            type: "SHIPMENT_STATUS_CHANGED",

            message: `Shipment moved from ${currentStatus} to ${nextStatus}`,

            meta: {

                from: currentStatus,

                to: nextStatus

            }

        });

        return res.json({

            status: 1,

            message: "Shipment status updated.",

            data: shipment

        });

    } catch (err) {

        return res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

  exports.getShipmentDetails = async (req, res) => {
    try {
      const shipmentId = req.params.id;
      const shipment = await Shipment.findById(shipmentId)
.populate("cargo.hsCode")
.populate("userId","name email");
  
      if (!shipment) {
        return res.status(404).json({
          status: 0,
          message: "Shipment not found"
        });
      }
      const tracking = await ShipmentTracking.find({
        shipmentId
      }).sort({ createdAt: 1 });
      const documents = await ShipmentDocument.find({
        shipmentId
      });
      const parties = await ShipmentParty.find({
        shipmentId
      });
      const costSummary = await ShipmentCost.findOne({
        shipmentId
      });
      const activity = await Activity.find({
        shipmentId
      }).sort({ createdAt: -1 });
      const exporter =
        parties.find(p => p.type === "Exporter") || null;
      const importer =
        parties.find(p => p.type === "Importer") || null;
      const notifyParty =
        parties.find(p => p.type === "Notify") || null;
      const header = {
        shipmentId: shipment.sbNumber,
        shipmentStatus: shipment.shipmentStatus,
        route: {
          originCountry: shipment.route?.originCountry,
          originCity: shipment.route?.originCity,
          destinationCountry: shipment.route?.destinationCountry,
          destinationCity: shipment.route?.destinationCity
        },
        etd: shipment.etd,
        eta: shipment.eta,
        goods: shipment.cargo.productName,
        estimatedCost: shipment.estimatedCost || 0,
        transitTime: shipment.transitTime || "-"
      };
      const shipmentInfo = {
        shipmentId: shipment.sbNumber,
        mode: shipment.route.mode,
        carrier: shipment.carrier,
        hsCode: shipment.cargo.hsCode,
        goods: shipment.cargo.productName,
        quantity: shipment.cargo.quantity,
        weight: shipment.cargo.weight,
        incoterm: shipment.incoterm,
        awbNumber: shipment.awbNumber,
        totalVolume: shipment.totalVolume,
        origin: {
          country: shipment.route?.originCountry,
          city: shipment.route?.originCity
        },
        
        destination: {
          country: shipment.route?.destinationCountry,
          city: shipment.route?.destinationCity
        },
        etd: shipment.etd,
        eta: shipment.eta,
        transitTime: shipment.transitTime,
        lastUpdated: shipment.lastUpdated
      };
      const overview = {
        status: shipment.shipmentStatus,
        estimatedCost: shipment.estimatedCost,
        paidAmount: shipment.paidAmount,
        balanceAmount: shipment.balanceAmount,
        paymentStatus: shipment.paymentStatus,
        createdOn: shipment.createdAt,
        createdBy: shipment.userId,
        notes:shipment.notes,
        additionalInformation:shipment.additionalInformation
      };
  
      res.json({
        status: 1,
        message: "Shipment details fetched successfully",
  
        data: {
  
          header,
  
          tracking,
  
          shipmentInfo,
  
          overview,
  
          documents,
  
          parties: {
            exporter,
            importer,
            notifyParty
          },

          notes: shipment.notes,
  
          costSummary,
  
          activity
  
        }
  
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  };


  exports.getShipmentTracking = async (req, res) => {
    try {
  
      const shipmentId = req.params.id;
      const shipment = await Shipment.findById(shipmentId)
        .populate("cargo.hsCode");
  
      if (!shipment) {
        return res.status(404).json({
          status: 0,
          message: "Shipment not found"
        });
      }
      const trackingTimeline = await ShipmentTracking.find({
        shipmentId
      }).sort({ createdAt: 1 });
      const currentLocation = trackingTimeline.find(
        item => item.current === true
      );
      const parties = await ShipmentParty.find({
        shipmentId
      });
      const documents = await ShipmentDocument.find({
        shipmentId
      });
      const notifications = await Activity.find({
        shipmentId
      })
        .sort({ createdAt: -1 })
        .limit(5);
      const exporter =
        parties.find(x => x.type === "Exporter") || null;
      const importer =
        parties.find(x => x.type === "Importer") || null;
      const notifyParty =
        parties.find(x => x.type === "Notify") || null;
      const header = {
        shipmentId: shipment.sbNumber,
        referenceNumber: shipment.referenceNumber,
      
        shipmentStatus: shipment.shipmentStatus,
        approvalStatus: shipment.approvalStatus,
        trackingStatus: shipment.trackingStatus,
      
        mode: shipment.route.mode,
      
        route: {
          origin: {
            country: shipment.route.originCountry,
            city: shipment.route.originCity
          },
          destination: {
            country: shipment.route.destinationCountry,
            city: shipment.route.destinationCity
          }
        },
      
        etd: shipment.etd,
        eta: shipment.eta,
        transitTime: shipment.transitTime,
        estimatedCost: shipment.estimatedCost
      };
      const liveTracking = {
        location: currentLocation?.location || null,
        currentStatus: currentLocation?.status || shipment.shipmentStatus,
        lastUpdate: currentLocation?.createdAt || null
      };
      const shipmentInfo = {
        shipmentId: shipment.sbNumber,
        carrier: shipment.carrier,
        route: shipment.route,
        quantity: shipment.cargo.quantity,
        weight: shipment.cargo.weight,
        volume: shipment.cargo.volumeCBM
      };
      const transportInfo = {
        awbNumber: shipment.awbNumber,
        incoterm: shipment.incoterm,
        carrier: shipment.carrier,
        etd: shipment.etd,
        eta: shipment.eta,
        transitTime: shipment.transitTime
      };
  
      res.json({
        status: 1,
        message: "Shipment tracking fetched successfully",
  
        data: {
  
          header,
  
          trackingTimeline,
  
          liveTracking,
  
          shipmentInfo,
  
          transportInfo,
  
          parties: {
            exporter,
            importer,
            notifyParty
          },
  
          documents,
  
          notifications
  
        }
  
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  };

  exports.addTrackingUpdate = async (req, res) => {
    try {
  
      const shipmentId = req.params.id;
  
      const {
        status,
        remarks,
        location
      } = req.body;
      const shipment = await Shipment.findById(shipmentId);
  
      if (!shipment) {
        return res.status(404).json({
          status: 0,
          message: "Shipment not found"
        });
      }
      if (!status) {
        return res.status(400).json({
          status: 0,
          message: "Tracking status is required"
        });
      }
      await ShipmentTracking.updateMany(
        {
          shipmentId,
          current: true
        },
        {
          current: false
        }
      );
      const tracking = await ShipmentTracking.create({
  
        shipmentId,
  
        status,
  
        location: {
          country: location?.country || "",
          city: location?.city || "",
          address: location?.address || "",
          latitude: location?.latitude || null,
          longitude: location?.longitude || null
        },
  
        remarks,
  
        updatedBy: req.user._id,
  
        current: true
  
      });
const allowed = canMoveToStatus(
  shipment.shipmentStatus,
  status
);

if (!allowed) {
  return res.status(400).json({
    status: 0,
    message: `Shipment cannot move from "${shipment.shipmentStatus}" to "${status}"`
  });
}
shipment.shipmentStatus = status;

shipment.trackingStatus = "Tracking Active";

shipment.lastStatusUpdatedAt = new Date();
shipment.currentLocation = {
  country: location?.country || "",
  city: location?.city || "",
  latitude: location?.latitude || null,
  longitude: location?.longitude || null
};
shipment.statusHistory.push({
  status,
  updatedBy: req.user._id,
  remarks,
  updatedAt: new Date()
});
if (status === "Delivered") {
  shipment.deliveredAt = new Date();
}
if (status === "Closed") {
  shipment.closedAt = new Date();
  shipment.trackingStatus = "Completed";
}

await shipment.save();
      await Activity.create({
  
        userId: req.user._id,
  
        shipmentId: shipment._id,
  
        type: "TRACKING_UPDATED",
        message: `Tracking updated to ${status} at ${location?.city || ""}`
  
      });
  
      res.status(200).json({
        status: 1,
        message: "Tracking updated successfully",
        data: tracking
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  };