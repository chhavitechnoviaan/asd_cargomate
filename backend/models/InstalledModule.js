const mongoose = require("mongoose");

const installedModuleSchema = new mongoose.Schema({

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
  },

  isInstalled: {
    type: Boolean,
    default: false
  },

  isEnabled: {
    type: Boolean,
    default: false
  },

  config: {
    type: Object,
    default: {}
  },

  installedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("InstalledModule", installedModuleSchema);