const Shipment = require("../models/Shipment");
const TradeRoute = require("../models/TradeRoute");

exports.getDashboard = async (req, res) => {
    try {

        const tradeValue = await TradeRoute.aggregate([
            {
                $group: {
                    _id: null,
                    totalTradeValue: { $sum: "$tradeValue" },
                    exportValue: {
                        $sum: {
                            $cond: [{ $eq: ["$tradeType", "Export"] }, "$tradeValue", 0]
                        }
                    },
                    importValue: {
                        $sum: {
                            $cond: [{ $eq: ["$tradeType", "Import"] }, "$tradeValue", 0]
                        }
                    },
                    shipments: { $sum: "$shipments" }
                }
            }
        ]);

        const fromCountries = await TradeRoute.distinct("fromCountry");
        const toCountries = await TradeRoute.distinct("toCountry");

        const countries = [...new Set([...fromCountries, ...toCountries])];

        const topProduct = await TradeRoute.aggregate([
            {
                $group: {
                    _id: "$topProduct",
                    value: { $sum: "$tradeValue" }
                }
            },
            { $sort: { value: -1 } },
            { $limit: 1 }
        ]);

        const topCountry = await TradeRoute.aggregate([
            {
                $group: {
                    _id: "$toCountry",
                    value: { $sum: "$tradeValue" }
                }
            },
            { $sort: { value: -1 } },
            { $limit: 1 }
        ]);

        return res.status(200).json({
            status: 1,
            data: {
                globalTradeValue: tradeValue[0]?.totalTradeValue || 0,
                totalShipments: tradeValue[0]?.shipments || 0,
                countriesTraded: countries.length,
                exportValue: tradeValue[0]?.exportValue || 0,
                importValue: tradeValue[0]?.importValue || 0,
                topProduct: topProduct[0] || {},
                topTradingCountry: topCountry[0] || {}
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: error.message
        });
    }

};

exports.getTradeFlow = async (req, res) => {
    try {

        const routes = await TradeRoute.find()
            .populate("hsCode", "hsCode description")
            .sort({ tradeValue: -1 });

        return res.status(200).json({
            status: 1,
            message: "Trade flow fetched successfully",
            data: routes
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopRoutes = async (req, res) => {
    try {

        const routes = await TradeRoute.find()
            .sort({
                tradeValue: -1
            })
            .limit(10);

        return res.status(200).json({
            status: 1,
            message: "Top trade routes fetched successfully",
            data: routes
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopCountries = async (req, res) => {
    try {

        const countries = await TradeRoute.aggregate([
            {
                $group: {
                    _id: "$toCountry",
                    tradeValue: {
                        $sum: "$tradeValue"
                    },
                    shipments: {
                        $sum: "$shipments"
                    }
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

        return res.status(200).json({
            status: 1,
            message: "Top countries fetched successfully",
            data: countries
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getRegionAnalysis = async (req, res) => {
    try {

        const regions = await TradeRoute.aggregate([
            {
                $group: {
                    _id: "$toCountry",
                    tradeValue: {
                        $sum: "$tradeValue"
                    }
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
            message: "Region analysis fetched successfully",
            data: regions
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getSummary = async (req, res) => {
    try {

        const interRegional = await TradeRoute.aggregate([
            {
               $match: {
                $expr: {
                    $ne: ["$fromCountry", "$toCountry"]
                }
            }
            },
            {
                $group: {
                    _id: null,
                    value: {
                        $sum: "$tradeValue"
                    }
                }
            }
        ]);

        const intraRegional = await TradeRoute.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ["$fromCountry", "$toCountry"]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    value: {
                        $sum: "$tradeValue"
                    }
                }
            }
        ]);

        const topGrowingRoute = await TradeRoute.findOne()
            .sort({ growth: -1 });

        const newestRoute = await TradeRoute.findOne()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: 1,
            data: {
                interRegionalTrade: interRegional[0]?.value || 0,
                intraRegionalTrade: intraRegional[0]?.value || 0,
                topGrowingRoute,
                newestRoute
            }
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getCountryOverview = async (req, res) => {
    try {

        const routes = await TradeRoute.find()
            .populate("hsCode", "hsCode")
            .sort({
                tradeValue: -1
            })
            .limit(20);

        return res.status(200).json({
            status: 1,
            message: "Country overview fetched successfully",
            data: routes
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

        const fromCountries = await TradeRoute.distinct("fromCountry");

        const toCountries = await TradeRoute.distinct("toCountry");

        const tradeTypes = await TradeRoute.distinct("tradeType");

        const products = await TradeRoute.distinct("topProduct");

        const hsCodes = await TradeRoute.find({}, "hsCode").populate("hsCode","hsCode description").select("hsCode");
        
        return res.status(200).json({
            status: 1,
            message: "Filter options fetched successfully",
            data: {
                fromCountries,
                toCountries,
                tradeTypes,
                products,
                hsCodes
            }
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};