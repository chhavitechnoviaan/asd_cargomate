const Shipment = require("../models/Shipment");


exports.getDashboard = async (req, res) => {
    try {

        const filter = {};

        const {
            from,
            to,
            origin,
            destination,
            exporter,
            buyer,
            status,
            hsCode
        } = req.query;

        if (from && to) {
            filter.shipmentDate = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        if (origin) filter["route.originCountry"] = origin;
        if (destination) filter["route.destinationCountry"] = destination;
        if (exporter) filter["exporter.companyName"] = exporter;
        if (buyer) filter["buyer.companyName"] = buyer;
        if (status) filter.shipmentStatus = status;
        if (hsCode) filter["cargo.hsCode"] = hsCode;

        const totalExportShipments = await Shipment.countDocuments(filter);

        const totalExportValue = await Shipment.aggregate([
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
        const countries = await Shipment.distinct("route.origin", filter);

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
            message: "Export dashboard fetched successfully",
            data: {
                totalExportShipments,
                totalExportValue: totalExportValue[0]?.total || 0,
                totalExporters: exporters.length,
                totalSuppliers: suppliers.length,
                countries: countries.length,
                avgShipmentValue: Math.round(avgShipmentValue[0]?.avg || 0),
                avgLeadTime: Math.round(avgLeadTime[0]?.avg || 0)
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }
};

exports.getExportTrend = async (req, res) => {
    try {

        const filter = {};

        const { from, to } = req.query;

        if (from && to) {
            filter.shipmentDate = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        const trend = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$shipmentDate"
                        }
                    },
                    totalValue: {
                        $sum: "$cargo.value"
                    },
                    shipments: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "_id": 1
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Export trend fetched successfully",
            data: trend
        });

    } catch (error) {

        console.log("Export Trend Error:", error);

        res.status(500).json({
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
                $unwind: {
                    path: "$hsCode",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        hsCode: "$hsCode.hsCode",
                        productName: "$cargo.productName"
                    },
                    shipments: {
                        $sum: 1
                    },
                    value: {
                        $sum: "$cargo.value"
                    }
                }
            },
            {
                $sort: {
                    shipments: -1
                }
            },
            {
                $limit: 5
            }
        ]);

        const data = products.map(item => ({
            hsCode: item._id.hsCode || "-",
            productName: item._id.productName,
            shipments: item.shipments,
            value: item.value,
            share: totalShipments
                ? ((item.shipments / totalShipments) * 100).toFixed(1)
                : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Top exported products fetched successfully",
            data
        });

    } catch (error) {

        console.log("Top Products Error:", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopExporters = async (req, res) => {
    try {

        const exporters = await Shipment.aggregate([
            {
                $group: {
                    _id: "$exporter.companyName",
                    shipments: {
                        $sum: 1
                    },
                    value: {
                        $sum: "$cargo.value"
                    }
                }
            },
            {
                $sort: {
                    shipments: -1
                }
            },
            {
                $limit: 5
            }
        ]);

        const data = exporters.map(item => ({
            exporter: item._id || "-",
            shipments: item.shipments,
            value: item.value,
            growth: 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Top exporters fetched successfully",
            data
        });

    } catch (error) {

        console.log("Top Exporters Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopBuyers = async (req, res) => {
    try {

        const buyers = await Shipment.aggregate([
            {
                $group: {
                    _id: "$buyer.companyName",
                    shipments: { $sum: 1 },
                    value: { $sum: "$cargo.value" }
                }
            },
            {
                $sort: {
                    shipments: -1
                }
            },
            {
                $limit: 5
            }
        ]);

        const data = buyers.map(item => ({
            buyer: item._id || "-",
            shipments: item.shipments,
            value: item.value,
            growth: 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Top buyers fetched successfully",
            data
        });

    } catch (error) {

        console.log("Top Buyers Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getCountryDistribution = async (req, res) => {
    try {

        const countries = await Shipment.aggregate([
            {
                $group: {
                    _id: "$route.destinationCountry",
                    value: { $sum: "$cargo.value" },
                    shipments: { $sum: 1 }
                }
            },
            {
                $sort: {
                    value: -1
                }
            }
        ]);

        const totalValue = countries.reduce((sum, item) => sum + item.value, 0);

        const data = countries.map(item => ({
            country: item._id || "-",
            shipments: item.shipments,
            value: item.value,
            percentage: totalValue
                ? Number(((item.value / totalValue) * 100).toFixed(2))
                : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Country distribution fetched successfully",
            totalValue,
            data
        });

    } catch (error) {

        console.log("Country Distribution Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getPortWiseExports = async (req, res) => {
    try {

        const ports = await Shipment.aggregate([
            {
                $group: {
                    _id: "$route.destinationCity",
                    shipments: { $sum: 1 },
                    value: { $sum: "$cargo.value" }
                }
            },
            {
                $sort: {
                    shipments: -1
                }
            }
        ]);

        const totalShipments = ports.reduce((sum, item) => sum + item.shipments, 0);

        const data = ports.map(item => ({
            port: item._id || "-",
            shipments: item.shipments,
            value: item.value,
            share: totalShipments ? ((item.shipments / totalShipments) * 100).toFixed(1) : "0.0"
        }));

        return res.status(200).json({
            status: 1,
            message: "Port wise exports fetched successfully",
            data
        });

    } catch (error) {

        console.log("Port Wise Export Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getRecentShipments = async (req, res) => {
    try {

        const shipments = await Shipment.find()
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 })
            .limit(10);

        return res.status(200).json({
            status: 1,
            message: "Recent export shipments fetched successfully",
            data: shipments
        });

    } catch (error) {

        console.log("Recent Shipments Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getFilterOptions = async (req, res) => {
    try {

        const hsCodes = await Shipment.find().populate("cargo.hsCode", "hsCode").select("cargo.hsCode");
        const ports = await Shipment.distinct("route.originCity");
        const countries = await Shipment.distinct("route.destinationCountry");
        const exporters = await Shipment.distinct("exporter.companyName");
        const buyers = await Shipment.distinct("buyer.companyName");
        const formattedHsCodes = [...new Set(hsCodes.map(item => item.cargo?.hsCode?.hsCode).filter(Boolean))];

        return res.status(200).json({
            status: 1,
            message: "Filter options fetched successfully",
            data: {
                hsCodes: formattedHsCodes,
                ports,
                countries,
                exporters,
                buyers
            }
        });

    } catch (error) {

        console.log("Filter Options Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};