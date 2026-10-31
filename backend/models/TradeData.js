const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  country: String,
  product: String,

  exportValue: Number, // monthly export value
  buyersCount: Number,

  month: String, // "Jan", "Feb"
  year: Number

}, { timestamps: true });

module.exports = mongoose.model("TradeData", tradeSchema);