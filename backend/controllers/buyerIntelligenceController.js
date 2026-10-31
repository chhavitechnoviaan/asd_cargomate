const Shipment=require("../models/Shipment");
const Buyer=require("../models/Buyer");

exports.getDashboard = async (req, res) => {
    try {

        const totalBuyers = await Buyer.countDocuments();

        const activeBuyers = await Buyer.countDocuments({
            status: "Active"
        });

        const countries = await Buyer.distinct("location.country");

        const shipmentStats = await Shipment.aggregate([
            {
                $group: {
                    _id: null,
                    shipments: { $sum: 1 },
                    tradeValue: { $sum: "$cargo.value" },
                    avgShipmentValue: { $avg: "$cargo.value" },
                    avgLeadTime: { $avg: "$leadTime" }
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Buyer dashboard fetched successfully",
            data: {
                totalBuyers,
                activeBuyers,
                totalShipments: shipmentStats[0]?.shipments || 0,
                totalTradeValue: shipmentStats[0]?.tradeValue || 0,
                countriesCovered: countries.length,
                avgShipmentValue: Math.round(shipmentStats[0]?.avgShipmentValue || 0),
                avgLeadTime: Math.round(shipmentStats[0]?.avgLeadTime || 0)
            }
        });

    } catch (error) {

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
          country: { $first: "$buyer.country" },
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

    const totalTradeValue = buyers.reduce(
      (sum, item) => sum + item.tradeValue,
      0
    );

    const data = buyers.map(item => ({
      buyer: item._id,
      country: item.country,
      tradeValue: item.tradeValue,
      share:
        totalTradeValue > 0
          ? ((item.tradeValue / totalTradeValue) * 100).toFixed(2)
          : "0.00"
    }));

    return res.status(200).json({
      status: 1,
      message: "Top buyers fetched successfully",
      data
    });

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};
exports.getTradeTrend = async (req, res) => {
    try {

        const trend = await Shipment.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$shipmentDate"
                        }
                    },
                    tradeValue: {
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
            message: "Trade trend fetched successfully",
            data: trend
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
          _id: "$buyer.country",
          buyers: {
            $addToSet: "$buyer.companyName"
          },
          tradeValue: {
            $sum: "$cargo.value"
          }
        }
      },
      {
        $project: {
          country: "$_id",
          buyers: {
            $size: "$buyers"
          },
          tradeValue: 1
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
      message: "Buyer countries fetched successfully",
      data: countries
    });

  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getGrowthBuyers = async (req, res) => {
    try {

        const buyers = await Buyer.find()
            .sort({
                tradeVolume: -1
            })
            .limit(10);

        const data = buyers.map(item => ({
            buyer: item.companyName,
            tradeValue: item.tradeVolume,
            growth: item.avgGrowth || 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Top growth buyers fetched successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getBuyerConcentration = async (req, res) => {
    try {

        const buyers = await Buyer.find().sort({
            tradeVolume: -1
        });

        const totalTrade = buyers.reduce(
            (sum, item) => sum + (item.tradeVolume || 0),
            0
        );

        const top10 = buyers
            .slice(0, 10)
            .reduce((sum, item) => sum + item.tradeVolume, 0);

        const top50 = buyers
            .slice(0, 50)
            .reduce((sum, item) => sum + item.tradeVolume, 0);

        const top100 = buyers
            .slice(0, 100)
            .reduce((sum, item) => sum + item.tradeVolume, 0);
        
        const totalBuyers = await Buyer.countDocuments();

        const buyerTypes = await Buyer.aggregate([
            {
                $group: {
                    _id: "$buyerType",
                    count: { $sum: 1 }
                }
            }
        ]);

        const buyerTypeData = buyerTypes.map(item => ({
            buyerType: item._id,
            count: item.count,
            percentage: totalBuyers
            ? ((item.count / totalBuyers) * 100).toFixed(1) : 0
        }));

        return res.status(200).json({
            status: 1,
            message: "Buyer concentration fetched successfully",
            data: {
                top10Share: totalTrade
                    ? ((top10 / totalTrade) * 100).toFixed(2)
                    : 0,
                top50Share: totalTrade
                    ? ((top50 / totalTrade) * 100).toFixed(2)
                    : 0,
                top100Share: totalTrade
                    ? ((top100 / totalTrade) * 100).toFixed(2)
                    : 0,
                buyerTypes: buyerTypeData
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getRecentShipments = async (req, res) => {
    try {

        const buyerId = req.query.buyerId;

        const filter = {};

        if (buyerId) {
            filter["buyer.buyerId"] = buyerId;
        }

        const shipments = await Shipment.find(filter)
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 })
            .limit(10);

        return res.status(200).json({
            status: 1,
            message: "Recent buyer shipments fetched successfully",
            data: shipments
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

        const buyers = await Buyer.find({}, "_id companyName");

        const countries = await Buyer.distinct("location.country");

        const buyerTypes = await Buyer.distinct("buyerType");

        const products = await Shipment.distinct("cargo.productName");

        const hsCodes = await Shipment.find({}, "cargo.hsCode").populate("cargo.hsCode", "hsCode").select("cargo.hsCode");

        const shipmentRanges = [
            100,
            500,
            1000,
            5000,
            10000
        ];

        const tradeValueRanges = [
            100000,
            500000,
            1000000,
            5000000,
            10000000
        ];

        return res.status(200).json({
            status: 1,
            message: "Buyer filter options fetched successfully",
            data: {
                buyers,
                countries,
                products,
                hsCodes,
                buyerTypes,
                shipmentRanges,
                tradeValueRanges
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};