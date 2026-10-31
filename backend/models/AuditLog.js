const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    userName: String,

    role: String,
    action: {
        type: String,
        enum: [
            "Created",
            "Updated",
            "Deleted",
            "Downloaded",
            "Uploaded",
            "Shared",
            "Viewed",
            "Login",
            "Logout",
            "Failed Login",
            "Auto Generated"
        ]
    },
    module: {
        type: String,
        enum: [
            "Dashboard",
            "Shipment Planning",
            "My Shipments",
            "Shipment Tracking",
            "Documents Center",
            "Vendor Recommendations",
            "Saved Reports",
            "HS Code Lookup",
            "Incentive Checker",
            "Freight Calculator",
            "Authentication",
            "User Management",
            "Settings"
        ]
    },
    entityType: {
        type: String
    },

    entityId: {
        type: mongoose.Schema.Types.ObjectId
    },

    entityReference: String,
    status: {
        type: String,
        enum: [
            "Success",
            "Failed",
            "Pending"
        ],
        default: "Success"
    },
    ipAddress: String,

    browser: String,

    device: String,

    requestMethod: String,

    requestUrl: String,

    responseCode: Number,

    responseTime: Number,
    oldData: {
        type: mongoose.Schema.Types.Mixed
    },

    newData: {
        type: mongoose.Schema.Types.Mixed
    },

    changes: [
        {
            field: String,
            oldValue: mongoose.Schema.Types.Mixed,
            newValue: mongoose.Schema.Types.Mixed
        }
    ],

    remarks: String

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "AuditLog",
    auditLogSchema
);