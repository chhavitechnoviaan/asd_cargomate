const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({

    isTrial: {type:Boolean,default:false},
    razorpayOrderId: String,
    razorpayPaymentId: String,
    audience: {type:String,enum:["user","b2b"]},
    usageCycleStart: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan"
    },

    billingCycle: {
        type: String,
        enum: ["Monthly", "Quarterly", "Yearly"],
        default: "Yearly"
    },

    startDate: Date,

    expiryDate: Date,

    nextBillingDate: Date,

    amount: {
        type: Number,
        default: 0
    },

    currency: {
        type: String,
        default: "INR"
    },

    status: {
        type: String,
        enum: [
            "Active",
            "Expired",
            "Cancelled",
            "Pending"
        ],
        default: "Active"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Subscription",
    subscriptionSchema
);