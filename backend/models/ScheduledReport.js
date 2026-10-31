const mongoose = require("mongoose");

const scheduledReportSchema = new mongoose.Schema(

  {

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    frequency: {
      type: String,
      enum: [
        "Daily",
        "Weekly",
        "Monthly"
      ],
      required: true
    },

    nextRun: Date,

    email: String,

    isActive: {
      type: Boolean,
      default: true
    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "ScheduledReport",
  scheduledReportSchema
);