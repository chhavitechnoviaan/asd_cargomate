const mongoose = require("mongoose");

const tradeIntelSchema = new mongoose.Schema({
  country: String,
  product: String,

  exportValue: Number,
  importValue: Number,

  month: String,
  year: Number

}, { timestamps: true });

module.exports = mongoose.model("TradeIntelligence", tradeIntelSchema);