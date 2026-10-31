const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment"
  },

  documentType: {
    type: String,
    enum: ["Invoice", "Packing List", "COO", "Shipping Bill"]
  },

  fileUrl: String,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);