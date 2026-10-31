const AuditLog = require("../models/AuditLog");

exports.createAuditLog = async ({
    req,
    user,
    action,
    module,
    entityType,
    entityId,
    entityReference,
    oldData = null,
    newData = null,
    changes = [],
    status = "Success",
    remarks = ""
}) => {

    try {

        await AuditLog.create({

            userId: user?._id,

            userName: user?.name,

            role: user?.role,

            action,

            module,

            entityType,

            entityId,

            entityReference,

            status,

            ipAddress: req.ip,

            browser: req.headers["user-agent"],

            device: req.headers["user-agent"],

            requestMethod: req.method,

            requestUrl: req.originalUrl,

            oldData,

            newData,

            changes,

            remarks

        });

    }

    catch (err) {

        console.log("Audit Log Error:", err.message);

    }

};

const { createAuditLog } = require("../helpers/createAuditLog");

await createAuditLog({

    req,

    user: req.user,

    action: "Created",

    module: "Shipment Planning",

    entityType: "Shipment",

    entityId: shipment._id,

    entityReference: shipment.sbNumber,

    newData: shipment

});

await createAuditLog({

    req,

    user: req.user,

    action: "Downloaded",

    module: "Saved Reports",

    entityType: "Report",

    entityId: report._id,

    entityReference: report.reportName

});

await createAuditLog({

    req,

    user: req.user,

    action: "Viewed",

    module: "Vendor Recommendations",

    entityType: "Vendor",

    entityId: vendor._id,

    entityReference: vendor.vendorName

});