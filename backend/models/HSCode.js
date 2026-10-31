
const mongoose = require("mongoose");

const hsCodeSchema = new mongoose.Schema({
  hsCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  productName: String,
  description: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterCategory" 
  },

  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterItem"
  },

  applicableCountries: [String],

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"]
  },

  status: {
    type: String,
    enum: ["active", "inactive", "draft"],
    default: "draft"
  },

  tradeInfo: {
    importDuty: Number,
    exportDuty: Number,
    gst: Number,
    restrictedItem: Boolean,
    licenseRequired: Boolean,
    clearanceTime: String,
    tradeVolume: String
  },

  chapter: {
    type: String
},

heading: {
  type: String
},
subHeading: {
  type: String
},
flow: {
  type: String,
  enum: ["Import", "Export", "Both"],
  default: "Both"
},


 

  countryRules: [
    {
      country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("HSCode", hsCodeSchema);