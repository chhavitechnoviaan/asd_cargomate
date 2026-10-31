const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },

    quotationNumber: {
      type: String,
      unique: true,
      required: true,
    },

    quoteVersion: {
      type: String,
      default: "V.1",
    },

    validFrom: {
      type: Date,
      default: Date.now,
    },

    validUntil: {
      type: Date,
    },

    freightQuote: {
      type: Number,
      default: 0,
    },

    charges: [
      {
        name: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          default: "",
        },

        amount: {
          type: Number,
          required: true,
          default: 0,
        },

        currency: {
          type: String,
          default: "INR",
        },
      },
    ],

    subtotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    notes: {
      type: String,
      default: "",
    },

    termsAndConditions: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Shared",
        "Accepted",
        "Rejected",
        "Expired",
      ],
      default: "Draft",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sharedAt: Date,
    acceptedAt: Date,
    rejectedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Quotation",
  quotationSchema
);