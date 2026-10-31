const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  integrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Integration"
  },

  action: String, // connect / disconnect / test

  status: String, // success / failed

  response: Object,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("IntegrationLog", logSchema);