const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad"
  },

  date: Date,

  impressions: Number,
  clicks: Number,

  placement: String,
  device: String // mobile / desktop

}, { timestamps: true });

module.exports = mongoose.model("AdAnalytics", analyticsSchema);