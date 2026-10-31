const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({

    invoiceNumber: {
        type: String,
        unique: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription"
    },

    amount: Number,

    paymentMethod: String,

    status: {
        type: String,
        enum: [
            "Paid",
            "Pending",
            "Failed"
        ],
        default: "Pending"
    },

    invoiceUrl: String,

    paidAt: Date

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Invoice",
    invoiceSchema
);