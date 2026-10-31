const mongoose = require("mongoose");

const auditSettingSchema = new mongoose.Schema({

    retentionDays: {

        type: Number,

        default: 365

    },

    enableLogs: {

        type: Boolean,

        default: true

    },

    exportCSV: {

        type: Boolean,

        default: true

    },

    exportPDF: {

        type: Boolean,

        default: true

    },

    criticalActions: [

        {

            type: String

        }

    ],

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
    "AuditSetting",
    auditSettingSchema
);