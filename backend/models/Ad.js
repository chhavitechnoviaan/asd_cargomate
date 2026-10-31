const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  // Legacy fields retained for compatibility with existing ad records.
  title: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["banner", "video", "popup"],
    default: "banner"
  },
  placement: {
    type: String,
    enum: ["dashboard", "homepage", "sidebar"],
    default: "dashboard"
  },
  image: { type: String, default: "" },
  redirectUrl: { type: String, default: "" },
  clickBehavior: {
    type: String,
    enum: ["same_tab", "new_tab"],
    default: "new_tab"
  },

  // Campaign fields used by Admin Ad Management and dashboard placements.
  location: { type: String, trim: true, index: true },
  postText: { type: String, trim: true, default: "" },
  subPostText: { type: String, trim: true, default: "" },
  linkUrl: { type: String, trim: true, default: "" },
  targetStartDate: { type: Date, default: null },
  startDate: Date,
  endDate: Date,

  priority: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ["active", "paused", "inactive", "draft"],
    default: "active",
    index: true
  },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
}, { timestamps: true });

adSchema.index({ location: 1, status: 1, targetStartDate: 1 });

module.exports = mongoose.model("Ad", adSchema);
