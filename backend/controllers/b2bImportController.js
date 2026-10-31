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
            importer,
            supplier,
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

        if (origin) {
            filter["route.origin"] = origin;
        }

        if (destination) {
            filter["route.destination"] = destination;
        }

        if (exporter) {
            filter["exporter.companyName"] = exporter;
        }

        if (importer) {
            filter["importer.companyName"] = importer;
        }

        if (supplier) {
            filter["supplier.companyName"] = supplier;
        }

        if (buyer) {
            filter["buyer.companyName"] = buyer;
        }

        if (status) {
            filter.status = status;
        }

        if (hsCode) {
            filter["cargo.hsCode"] = hsCode;
        }

        const totalShipments = await Shipment.countDocuments(filter);

        const totalImportValue = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$cargo.value"
                    }
                }
            }
        ]);

        const importers = await Shipment.distinct(
            "importer.companyName",
            filter
        );

        const suppliers = await Shipment.distinct(
            "supplier.companyName",
            filter
        );

        const countries = await Shipment.distinct(
            "route.origin",
            filter
        );

        const avgShipmentValue = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    avg: {
                        $avg: "$cargo.value"
                    }
                }
            }
        ]);

        const avgLeadTime = await Shipment.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    avg: {
                        $avg: "$leadTime"
                    }
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Dashboard fetched successfully",
            data: {
                totalShipments,
                totalImportValue: totalImportValue[0]?.total || 0,
                totalImporters: importers.length,
                totalSuppliers: suppliers.length,
                countries: countries.length,
                avgShipmentValue: Math.round(avgShipmentValue[0]?.avg || 0),
                avgLeadTime: Math.round(avgLeadTime[0]?.avg || 0)
            }
        });

    } catch (error) {

        console.log("Dashboard Error :", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Import Trend Graph
 */
exports.getImportTrend = async (req, res) => {

    try{

        const trend = await Shipment.aggregate([

            {

                $group:{

                    _id:{

                        $dateToString:{

                            format:"%Y-%m-%d",

                            date:"$shipmentDate"

                        }

                    },

                    totalValue:{

                        $sum:"$cargo.value"

                    },

                    shipments:{

                        $sum:1

                    }

                }

            },

            {

                $sort:{

                    "_id":1

                }

            }

        ]);

        return res.json({

            status:1,

            data:trend

        });

    }

    catch(error){

        res.status(500).json({

            status:0,

            message:error.message

        });

    }

}


/**
 * Top Imported Products
 */
exports.getTopProducts = async (req, res) => {

    try {

        const products = await Shipment.aggregate([

            {

                $group:{
                    _id:{
                        hsCode:"$cargo.hsCode",
                        product:"$cargo.productName"
                    },
                    shipments:{$sum:1},
                    value:{$sum:"$cargo.value"}
                }

            },

            {

                $sort:{

                    shipments:-1

                }

            },

            {

                $limit:5

            }

        ]);

        return res.json({

            status:1,

            data:products

        });

    }

    catch(error){

        res.status(500).json({

            status:0,

            message:error.message

        });

    }

}


/**
 * Top Suppliers
 */
exports.getTopSuppliers = async (req, res) => {
    try {

        const suppliers = await Shipment.aggregate([
            {
                $group: {
                    _id: "$supplier.companyName",
                    shipments: { $sum: 1 },
                    value: { $sum: "$cargo.value" }
                }
            },
            { $sort: { shipments: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            status: 1,
            data: suppliers
        });

    } catch (error) {

        console.log("Top Suppliers Error:", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Top Importers
 */
exports.getTopImporters = async (req, res) => {
    try {

        const importers = await Shipment.aggregate([
            {
                $group: {
                    _id: "$importer.companyName",
                    shipments: { $sum: 1 },
                    value: { $sum: "$cargo.value" }
                }
            },
            { $sort: { shipments: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            status: 1,
            data: importers
        });

    } catch (error) {

        console.log("Top Importers Error:", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Country Distribution (Pie Chart)
 */
exports.getCountryDistribution = async (req, res) => {
    try {

        const countries = await Shipment.aggregate([
            {
                $group: {
                    _id: "$route.destinationCountry",
                    value: { $sum: "$cargo.value" }
                }
            },
            {
                $sort: { value: -1 }
            }
        ]);

        const totalValue = countries.reduce((sum, item) => sum + item.value, 0);

        const result = countries.map(item => ({
            country: item._id,
            value: item.value,
            percentage: totalValue
                ? ((item.value / totalValue) * 100).toFixed(2)
                : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Country distribution fetched successfully",
            totalValue,
            data: result
        });

    } catch (error) {

        console.log("Country Distribution Error:", error);

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Port Wise Imports
 */
exports.getPortWiseImports = async (req, res) => {
    try {

        const ports = await Shipment.aggregate([
            {
                $group: {
                    _id: "$route.destinatonCity",
                    shipments: { $sum: 1 },
                    value: { $sum: "$cargo.value" }
                }
            },
            { $sort: { shipments: -1 } }
        ]);

        res.status(200).json({
            status: 1,
            data: ports
        });

    } catch (error) {

        console.log("Port Wise Imports Error:", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Recent Shipments
 */
exports.getRecentShipments = async (req, res) => {
    try {

        const shipments = await Shipment.find()
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 })
            .limit(10);

        res.status(200).json({
            status: 1,
            data: shipments
        });

    } catch (error) {

        console.log("Recent Shipments Error:", error);

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


/**
 * Filters Dropdown
 */
exports.getFilterOptions = async (req, res) => {

    try {

        const hsCodes = await Shipment.distinct("cargo.hsCode");

        const ports = await Shipment.distinct("route.originCity");

        const countries = await Shipment.distinct("route.destinationCountry");

        const exporters = await Shipment.distinct("exporter.companyName");

        const buyers = await Shipment.distinct("buyer.companyName");

        return res.status(200).json({

            status:1,

            data:{

                hsCodes,

                ports,

                countries,

                exporters,

                buyers

            }

        });

    } catch (error) {

        res.status(500).json({

            status:0,

            message:error.message

        });

    }

}