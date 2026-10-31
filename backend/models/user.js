const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      select: false,
    },

    companyName: String,

    gstNumber: String,

    importExportId: String,

    phone: String,

    businessType: String,

    expiryDate: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,

    otpExpiry: Date,

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentRole",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    aiLimit: {
      type: Number,
      default: 100,
    },

    aiUsed: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: "",
    },

    designation: String,

    gstin: String,

    country: String,

    city: String,

    address: String,

    accountType: {
      type: String,
      default: "Exporter",
    },

    plan: {
      type: String,
      default: "Free",
    },

    accountStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    profileCompletion: {
      type: Number,
      default: 0,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    gstVerified: {
      type: Boolean,
      default: false,
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    lastLogin: Date,

    planExpiry: Date,

    // ================= KYC =================

    kycStatus: {
      type: String,
      enum: ["Not Submitted",
    "Submitted",
    "Under Review",
    "Verified",
    "Rejected",
    "Re-upload Required"],
      default: "Not Submitted",
    },

    kycVerifiedAt: {
      type: Date,
      default: null,
    },

    kycRejectedAt: {
      type: Date,
      default: null,
    },

    kycRejectionReasons: {
      type: [String],
      default: [],
    },

    kycRejectionNote: {
      type: String,
      default: "",
    },

    kycDocuments: {
      type: [documentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);