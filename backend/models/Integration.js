const mongoose = require("mongoose");

const integrationSchema = new mongoose.Schema({
  name: {
    type: String, // DHL, UPS, FedEx
    required: true
  },

  code: {
    type: String, // dhl, ups, fedex
    unique: true
  },

  apiKey: String,

  status: {
    type: String,
    enum: ["connected", "disconnected"],
    default: "disconnected"
  },

  lastSync: Date,

  totalCalls: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Integration", integrationSchema);