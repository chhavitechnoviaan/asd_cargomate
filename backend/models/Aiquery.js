const mongoose = require("mongoose");

const aiQuerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  query: String,

  response: String,

  type: {
    type: String,
    enum: ["HS_CODE", "FREIGHT", "INCENTIVE", "GENERAL"]
  }

}, { timestamps: true });

module.exports = mongoose.model("AIQuery", aiQuerySchema);