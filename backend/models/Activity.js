const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    enum: [
      "SHIPMENT_CREATED",
      "SHIPMENT_UPDATED",
      "SHIPMENT_SUBMITTED",
      "SHIPMENT_APPROVED",
      "SHIPMENT_REJECTED",
      "SHIPMENT_ON_HOLD",
      "SHIPMENT_STATUS_CHANGED",
  
      "DOCUMENT_UPLOADED",
      "DOCUMENT_VERIFIED",
      "DOCUMENT_REJECTED",
  
      "TRACKING_UPDATED",
  
      "PAYMENT_RECEIVED",
      "PAYMENT_FAILED",
  
      "AI_QUERY",
      "INCENTIVE_CHECKED",
      "FREIGHT_CALCULATED"
    ]
  },

  message: String,

  meta: {
    type: Object // extra data (optional)
  },

  shipmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shipment"
    }

}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);