const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({

  name: String,
  slug: String,

  description: String,

  type: {
    type: String,
    enum: ["free", "premium", "custom"], 
    default: "free"
  },

  rating: Number,
  downloads: Number,

  icon: String,

  version: String,

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Module", moduleSchema);