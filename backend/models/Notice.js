const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Important Shipping Notice"
  },
  subtitle: {
    type: String,
    default: "Shipping Guidelines"
  },
  description: {
    type: String,
    required: true,
    default: "Please review the latest shipping guidelines before booking your next shipment."
  },
  details: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  scheduleDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  targetAudience: {
    type: String,
    enum: ["all", "user", "dealer", "b2b"],
    default: "all"
  },
  status: {
    type: String,
    enum: ["draft", "scheduled", "published"],
    default: "published"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);
