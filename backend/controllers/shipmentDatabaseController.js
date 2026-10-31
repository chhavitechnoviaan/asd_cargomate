const Shipment = require("../models/Shipment");

exports.getDashboard = async (req, res) => {
    try {

        const filter = {};

        const { from, to, origin, destination, exporter, importer, status, hsCode } = req.query;

        if (from && to) {
            filter.shipmentDate = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        if (origin) filter["route.originCountry"] = origin;
        if (destination) filter["route.destinationCountry"] = destination;
        if (exporter) filter["exporter.companyName"] = exporter;
        if (importer) filter["importer.companyName"] = importer;
        if (status) filter.status = status;
        if (hsCode) filter["cargo.hsCode"] = hsCode;

        const totalShipments = await Shipment.countDocuments(filter);

        const totalValue = await Shipment.aggregate([
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
            message: "Shipment dashboard fetched successfully",
            data: {
                totalShipments,
                totalValue: totalValue[0]?.total || 0,
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

exports.getShipments = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.origin)
            filter["route.originCountry"] = req.query.origin;

        if (req.query.destination)
            filter["route.destinationCountry"] = req.query.destination;

        if (req.query.exporter)
            filter["exporter.companyName"] = req.query.exporter;

        if (req.query.importer)
            filter["importer.companyName"] = req.query.importer;

        if (req.query.hsCode)
            filter["cargo.hsCode"] = req.query.hsCode;

        if (req.query.status)
            filter.status = req.query.status;

        const total = await Shipment.countDocuments(filter);

        const shipments = await Shipment.find(filter)
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            status: 1,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: shipments
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getFilterOptions = async (req, res) => {
    try {

        const hsCodes = await Shipment.distinct("cargo.hsCode");

        const originCountries = await Shipment.distinct("route.originCountry");

        const destinationCountries = await Shipment.distinct("route.destinationCountry");

        const importers = await Shipment.distinct("importer.companyName");

        const exporters = await Shipment.distinct("exporter.companyName");

        const ports = await Shipment.distinct("route.originCity");

        return res.status(200).json({
            status: 1,
            data: {
                hsCodes,
                originCountries,
                destinationCountries,
                importers,
                exporters,
                ports
            }
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.exportReport = async (req, res) => {
    try {

        const filter = {};

        const { from, to, origin, destination, exporter, importer, status, hsCode } = req.query;

        if (from && to) {
            filter.shipmentDate = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        if (origin) filter["route.originCountry"] = origin;
        if (destination) filter["route.destinationCountry"] = destination;
        if (exporter) filter["exporter.companyName"] = exporter;
        if (importer) filter["importer.companyName"] = importer;
        if (hsCode) filter["cargo.hsCode"] = hsCode;
        if (status) filter.status = status;

        const report = await Shipment.find(filter)
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 });

        return res.status(200).json({
            status: 1,
            message: "Shipment report fetched successfully",
            totalRecords: report.length,
            data: report
        });

    } catch (error) {

        console.log("Export Report Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};