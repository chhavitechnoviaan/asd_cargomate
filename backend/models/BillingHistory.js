const mongoose = require("mongoose");

const billingHistorySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
    },

    transactionId: String,

    amount: Number,

    paymentMethod: String,

    status: {
        type: String,
        enum: [
            "Success",
            "Failed",
            "Refunded"
        ],
        default: "Success"
    },

    paymentDate: Date

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "BillingHistory",
    billingHistorySchema
);