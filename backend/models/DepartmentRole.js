const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({

  name: String,

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },

  permissions: {
    dashboard: Boolean,
    users: Boolean,
    reports: Boolean,
    settings: Boolean
  }

}, { timestamps: true });

module.exports = mongoose.model("DepartmentRole", roleSchema);