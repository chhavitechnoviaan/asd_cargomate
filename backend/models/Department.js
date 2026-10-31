const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({

  name: { type: String, required: true },
  description: String,

  type: {
    type: String,
    enum: ["sales", "support", "technical", "billing"]
  },

  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  access: {
    dashboard: { type: Boolean, default: false },
    users: { type: Boolean, default: false },
    reports: { type: Boolean, default: false },
    settings: { type: Boolean, default: false }
  },

  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "DepartmentRole"
  }],

  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);