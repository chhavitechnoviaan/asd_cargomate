const mongoose = require("mongoose");

const dgftSchemeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true,
    unique: true
  },

  year: Number,

  description: String,

  benefits: [
    {
      type: String
    }
  ],

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },

  applicantsCount: {
    type: Number,
    default: 0
  },

  benefitsClaimed: {
    type: Number, // ₹ value
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("DgftScheme", dgftSchemeSchema);