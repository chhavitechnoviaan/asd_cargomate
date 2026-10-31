const mongoose = require("mongoose");

const countryRuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true },
  ruleCode: String,
  ruleType: { type: String, required: true },
  sourceCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country"
  },
  destinationCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country"
  },
  region: String,
  tradeZone: String,
  taxRules: {
    customsDuty: Number,
    importTax: Number,
    exportTax: Number,
    vatGst: Number,
    currency: String,
    penalty: Number,
    formula: String
  },
  compliance: {
    documents: [String],
    customsApproval: Boolean,
    licenseRequired: Boolean,
    restrictedCategories: [String],
    notes: String,
    files: [String]
  },
  aiData: {
    riskScore: Number,
    fraudProbability: Number,
    alerts: Number,
    recommendation: String
  },
  automation: {
    condition: String,
    shipmentType: String,
    vendorSpecific: Boolean,
    smartValidation: Boolean,
    triggerNotification: Boolean
  },

  importRestrictions: String,

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  hsCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HSCode"
  }

}, { timestamps: true });

module.exports = mongoose.model("CountryRule", countryRuleSchema);