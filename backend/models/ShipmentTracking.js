const mongoose = require("mongoose");

const shipmentTrackingSchema = new mongoose.Schema({

    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipment",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Carrier Assigned",
            "Pickup Scheduled",
            "Picked Up",
            "Warehouse Received",
            "Customs Documentation",
            "Customs Clearance",
            "In Transit",
            "Arrived at Destination",
            "Out for Delivery",
            "Delivered",
            "Closed"
        ],
        required: true
    },

    location: {
        country: String,
        city: String,
        address: String,
        latitude: Number,
        longitude: Number
    },

    remarks: {
        type: String,
        default: ""
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    current: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

shipmentTrackingSchema.index({ shipmentId: 1, createdAt: -1 });

module.exports = mongoose.model("ShipmentTracking", shipmentTrackingSchema);