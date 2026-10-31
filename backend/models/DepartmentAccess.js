const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema({

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },

  permissions: {
    dashboard: { type: Boolean, default: false },
    users: { type: Boolean, default: false },
    reports: { type: Boolean, default: false },
    settings: { type: Boolean, default: false }
  }

});

module.exports = mongoose.model("DepartmentAccess", accessSchema);