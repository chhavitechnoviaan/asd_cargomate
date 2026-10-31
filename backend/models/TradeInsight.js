const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["market", "product", "route"]
  },

  title: String,
  value: String,
  description: String,

  meta: Object // optional extra data

}, { timestamps: true });

module.exports = mongoose.model("TradeInsight", insightSchema);