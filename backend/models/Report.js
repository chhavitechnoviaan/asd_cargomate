const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(

  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reportName: {
      type: String,
      required: true
    },

    description: String,

    category: {
      type: String,
      enum: [
        "Shipment Reports",
        "Cost & Finance Reports",
        "Vendor Reports",
        "Compliance Reports",
        "Document Reports",
        "Performance Reports",
        "Analytics & Trends"
      ]
    },

    dataSource: {
      type: String
    },
    module: {
      type: String,
      enum: [
        "Dashboard",
        "Shipment",
        "Shipment Tracking",
        "HS Lookup",
        "Incentive Checker",
        "Freight Calculator",
        "Vendor Recommendation",
        "Documents Center",
        "Analytics"
      ]
    },

    moduleId: {
      type: mongoose.Schema.Types.ObjectId
    },

    reportData: {
      type: mongoose.Schema.Types.Mixed
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    isShared: {
      type: Boolean,
      default: false
    },
    isFavourite: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: [
        "None",
        "Daily",
        "Weekly",
        "Monthly"
      ],
      default: "None"
    },
    totalViews: {
      type: Number,
      default: 0
    },

    totalDownloads: {
      type: Number,
      default: 0
    },

    lastViewed: Date,
    isDeleted: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Archived"
      ],
      default: "Active"
    },

    type: {
      type: String,
      enum: [
        "Summary",
        "Operational",
        "Analytics",
        "Financial",
        "Compliance",
        "Performance"
      ]
    },
    
    format: {
      type: String,
      enum: ["PDF", "Excel", "CSV"],
      default: "PDF"
    },
    
    fileUrl: String,

  },

  
  {
    timestamps: true
  }

);

module.exports = mongoose.model("Report", reportSchema);