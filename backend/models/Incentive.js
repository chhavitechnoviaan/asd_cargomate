const mongoose = require("mongoose");

const incentiveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipment"
  },

  scheme: {
    type: String,
    enum: ["RoDTEP", "MEIS", "EPCG"]
  },

  percentage: Number,

  amount: Number

}, { timestamps: true });

module.exports = mongoose.model("Incentive", incentiveSchema);