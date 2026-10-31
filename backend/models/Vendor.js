const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({

    vendorName: {
        type: String,
        required: true
    },

    companyName: {
        type: String,
        required: true
    },

    serviceTypes: [{
        type: String,
        enum: [
            "Freight Forwarder",
            "Customs Broker",
            "Transporter",
            "Warehouse",
            "Packing & Handling",
            "Shipping Line",
            "Air Cargo"
        ]
    }],

    location: {

        city: String,

        state: String,

        country: String

    },

    routes: [

        {

            origin: String,

            destination: String

        }

    ],

    transportModes: [{

        type: String,

        enum: [

            "Air",

            "Sea",

            "Road"

        ]

    }],

    rating: {

        type: Number,

        default: 0

    },

    totalReviews: {

        type: Number,

        default: 0

    },

    responseTime: String,

    estimatedCost: Number,

    transitTime: String,

    matchScore: {

        type: Number,

        default: 0

    },

    phone: String,

    email: String,

    website: String,

    logo: String,

    description: String,

    verified: {

        type: Boolean,

        default: false

    },

    status: {

        type: String,

        enum: [

            "Active",

            "Inactive"

        ],

        default: "Active"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "Vendor",
    vendorSchema
);