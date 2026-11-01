const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    senderName: {
        type: String,
        default: "Support Team"
    },
    senderRole: {
        type: String,
        default: "Support Admin"
    },
    message: {
        type: String,
        required: true
    },
    emailSent: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const supportTicketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    userType: {
        type: String,
        enum: ["Customer", "Vendor", "Dealer", "Admin"],
        default: "Customer"
    },

    ticketId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },

    subject: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "Shipments",
            "Shipment",
            "Documents",
            "Document",
            "HS Codes",
            "HS Code",
            "Freight & Costs",
            "Freight",
            "Payment",
            "Other"
        ],
        default: "Shipment"
    },

    priority: {
        type: String,
        enum: [
            "Low",
            "Medium",
            "High"
        ],
        default: "Medium"
    },

    status: {
        type: String,
        enum: [
            "Open",
            "In Progress",
            "Replied",
            "Resolved",
            "Closed"
        ],
        default: "Open"
    },

    attachment: {
        type: String,
        default: ""
    },

    attachmentName: {
        type: String,
        default: ""
    },

    replies: [replySchema],

    lastRepliedBy: {
        name: { type: String, default: "" },
        role: { type: String, default: "" },
        repliedAt: { type: Date }
    },

    lastAdminReply: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "SupportTicket",
    supportTicketSchema
);
