const Shipment = require("../models/Shipment");
const HSCode = require("../models/HSCode");

exports.getDashboard = async (req, res) => {
    try {

        const filter = {};

        const { from, to, hsCode, country, flow } = req.query;

        if (from && to) {
            filter.shipmentDate = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        if (hsCode) {
            filter["cargo.hsCode"] = hsCode;
        }

        if (country) {
            filter["route.destinationCountry"] = country;
        }

        if (flow === "Import") {
            filter["cargo.flow"] = "Import";
        }

        if (flow === "Export") {
            filter["cargo.flow"] = "Export";
        }

        const totalShipments = await Shipment.countDocuments(filter);

        const totalTradeValue = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cargo.value" }
                }
            }
        ]);

        const exporters = await Shipment.distinct("exporter.companyName", filter);
        const suppliers = await Shipment.distinct("supplier.companyName", filter);
        const countries = await Shipment.distinct("route.originCountry", filter);

        const avgShipmentValue = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$cargo.value" }
                }
            }
        ]);

        const avgLeadTime = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$leadTime" }
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "HS Code dashboard fetched successfully",
            data: {
                totalShipments,
                totalTradeValue: totalTradeValue[0]?.total || 0,
                totalExporters: exporters.length,
                totalSuppliers: suppliers.length,
                countries: countries.length,
                avgShipmentValue: Math.round(avgShipmentValue[0]?.avg || 0),
                avgLeadTime: Math.round(avgLeadTime[0]?.avg || 0)
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getHSCodeList = async (req, res) => {
    try {

        const totalTrade = await Shipment.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cargo.value" }
                }
            }
        ]);

        const totalValue = totalTrade[0]?.total || 0;

        const hsCodes = await Shipment.aggregate([
            {
                $lookup: {
                    from: "hscodes",
                    localField: "cargo.hsCode",
                    foreignField: "_id",
                    as: "hsCode"
                }
            },
            {
                $unwind: "$hsCode"
            },
            {
                $group: {
                    _id: "$hsCode._id",
                    hsCode: { $first: "$hsCode.hsCode" },
                    description: { $first: "$hsCode.description" },
                    tradeValue: { $sum: "$cargo.value" }
                }
            },
            {
                $sort: {
                    tradeValue: -1
                }
            },
            {
                $limit: 10
            }
        ]);

        const data = hsCodes.map(item => ({
            hsCode: item.hsCode,
            description: item.description,
            tradeValue: item.tradeValue,
            share: totalValue
                ? ((item.tradeValue / totalValue) * 100).toFixed(2)
                : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "HS Code list fetched successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTradeFlow = async (req, res) => {
    try {

        const importValue = await Shipment.aggregate([
            {
                $lookup: {
                    from: "hscodes",
                    localField: "cargo.hsCode",
                    foreignField: "_id",
                    as: "hsCode"
                }
            },
            {
                $unwind: "$hsCode"
            },
            {
                $match: {
                    "hsCode.flow": {
                        $in: ["Import", "Both"]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cargo.value" }
                }
            }
        ]);

        const exportValue = await Shipment.aggregate([
            {
                $lookup: {
                    from: "hscodes",
                    localField: "cargo.hsCode",
                    foreignField: "_id",
                    as: "hsCode"
                }
            },
            {
                $unwind: "$hsCode"
            },
            {
                $match: {
                    "hsCode.flow": {
                        $in: ["Export", "Both"]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$cargo.value" }
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            data: {
                import: importValue[0]?.total || 0,
                export: exportValue[0]?.total || 0
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


exports.getTopProducts = async (req, res) => {
    try {

        const totalShipments = await Shipment.countDocuments();

        const products = await Shipment.aggregate([
            {
                $lookup: {
                    from: "hscodes",
                    localField: "cargo.hsCode",
                    foreignField: "_id",
                    as: "hsCode"
                }
            },
            {
                $unwind: "$hsCode"
            },
            {
                $group: {
                    _id: "$hsCode._id",
                    hsCode: { $first: "$hsCode.hsCode" },
                    description: { $first: "$hsCode.description" },
                    shipments: { $sum: 1 }
                }
            },
            {
                $sort: { shipments: -1 }
            },
            {
                $limit: 10
            }
        ]);

        const data = products.map(item => ({
            hsCode: item.hsCode,
            description: item.description,
            shipments: item.shipments,
            share: totalShipments
                ? ((item.shipments / totalShipments) * 100).toFixed(2)
                : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Top products fetched successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getCountries = async (req, res) => {
    try {

        const countries = await Shipment.aggregate([
            {
                $group: {
                    _id: "$route.destinationCountry",
                    tradeValue: { $sum: "$cargo.value" },
                    shipments: { $sum: 1 }
                }
            },
            {
                $sort: { tradeValue: -1 }
            },
            {
                $limit: 10
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Countries fetched successfully",
            data: countries
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getImporters = async (req, res) => {
    try {

        const importers = await Shipment.aggregate([
            {
                $group: {
                    _id: "$importer.companyName",
                    shipments: { $sum: 1 },
                    tradeValue: { $sum: "$cargo.value" }
                }
            },
            {
                $sort: { shipments: -1 }
            },
            {
                $limit: 20
            }
        ]);

        const data = importers.map(item => ({
            importer: item._id || "-",
            shipments: item.shipments,
            tradeValue: item.tradeValue
        }));

        return res.status(200).json({
            status: 1,
            message: "Importers fetched successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getExporters = async (req, res) => {
    try {

        const exporters = await Shipment.aggregate([
            {
                $group: {
                    _id: "$exporter.companyName",
                    shipments: { $sum: 1 },
                    tradeValue: { $sum: "$cargo.value" }
                }
            },
            { $sort: { shipments: -1 } },
            { $limit: 20 }
        ]);

        const data = exporters.map(item => ({
            exporter: item._id || "-",
            shipments: item.shipments,
            tradeValue: item.tradeValue
        }));

        return res.status(200).json({
            status: 1,
            message: "Exporters fetched successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTrends = async (req, res) => {
    try {

        const trends = await Shipment.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$shipmentDate"
                        }
                    },
                    tradeValue: { $sum: "$cargo.value" },
                    shipments: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Trend data fetched successfully",
            data: trends
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getHSCodeDetails = async (req, res) => {
    try {

        const details = await Shipment.aggregate([
            {
                $lookup: {
                    from: "hscodes",
                    localField: "cargo.hsCode",
                    foreignField: "_id",
                    as: "hsCode"
                }
            },
            {
                $unwind: "$hsCode"
            },
            {
                $group: {
                    _id: "$hsCode._id",
                    hsCode: { $first: "$hsCode.hsCode" },
                    description: { $first: "$hsCode.description" },
                    chapter: { $first: "$hsCode.chapter" },
                    heading: { $first: "$hsCode.heading" },
                    flow: { $first: "$hsCode.flow" },
                    tradeValue: { $sum: "$cargo.value" },
                    shipments: { $sum: 1 },
                    avgShipmentValue: { $avg: "$cargo.value" },
                    topCountry: { $first: "$route.destinationCountry" }
                }
            },
            {
                $sort: {
                    tradeValue: -1
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "HS Code details fetched successfully",
            data: details
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getFilterOptions = async (req, res) => {
    try {

        const hsCodes = await HSCode.find({}, "_id hsCode description chapter heading subHeading flow");

        const chapters = await HSCode.distinct("chapter");

        const headings = await HSCode.distinct("heading");

        const subHeadings = await HSCode.distinct("subHeading");

        const countries = await Shipment.distinct("route.destinationCountry");

        const flows = ["Import", "Export", "Both"];

        return res.status(200).json({
            status: 1,
            message: "Filter options fetched successfully",
            data: {
                hsCodes,
                chapters,
                headings,
                subHeadings,
                countries,
                flows
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};