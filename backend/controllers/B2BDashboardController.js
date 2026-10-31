const Shipment = require("../models/Shipment");
const Buyer = require("../models/Buyer");
const Company = require("../models/Company");
const Supplier = require("../models/Supplier");
const Document = require("../models/Document");

exports.getDashboardMetrics = async (req, res) => {
  try {
    const shipmentStats = await Shipment.aggregate([
      {
        $group: {
          _id: null,

          totalShipments: {
            $sum: 1
          },

          totalTradeValue: {
            $sum: {
              $ifNull: ["$cargo.value", 0]
            }
          },

          averageShipmentValue: {
            $avg: {
              $ifNull: ["$cargo.value", 0]
            }
          },

          averageLeadTime: {
            $avg: {
              $ifNull: ["$leadTime", 0]
            }
          }
        }
      }
    ]);

    const activeBusinessPartners = await Company.countDocuments({
      verified: true
    });

    const pendingBuyers = await Buyer.countDocuments({
      status: "Pending"
    });

    const stats = shipmentStats[0] || {};

    res.json({
      status: 1,

      data: {
        totalShipments: stats.totalShipments || 0,

        totalTradeValue: stats.totalTradeValue || 0,

        activeBusinessPartners,

        pendingBuyers,

        averageShipmentValue: Number(
          (stats.averageShipmentValue || 0).toFixed(2)
        ),

        averageLeadTime: Number(
          (stats.averageLeadTime || 0).toFixed(2)
        )
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getOperationalInsights = async (req, res) => {
  try {
    const deliveredShipments = await Shipment.find({
      shipmentStatus: "Delivered",
      deliveredAt: { $ne: null },
      eta: { $ne: null }
    }).select("deliveredAt eta");

    let onTimeShipments = 0;

    deliveredShipments.forEach((shipment) => {
      if (shipment.deliveredAt <= shipment.eta) {
        onTimeShipments++;
      }
    });

    const onTimeShipmentRate =
      deliveredShipments.length > 0
        ? Number(
            (
              (onTimeShipments / deliveredShipments.length) *
              100
            ).toFixed(1)
          )
        : 0;


    const totalShipments = await Shipment.countDocuments();

    const accurateShipments = await Shipment.countDocuments({
      shipmentStatus: "Delivered",
      exceptionStatus: "None"
    });

    const shipmentAccuracy =
      totalShipments > 0
        ? Number(
            (
              (accurateShipments / totalShipments) *
              100
            ).toFixed(1)
          )
        : 0;

    const totalDocuments = await Document.countDocuments();

    const approvedDocuments = await Document.countDocuments({
      status: "Approved"
    });

    const documentCompliance =
      totalDocuments > 0
        ? Number(
            (
              (approvedDocuments / totalDocuments) *
              100
            ).toFixed(1)
          )
        : 0;


    const activeBuyers = await Buyer.countDocuments({
      status: "Active",
      orders: { $gt: 0 }
    });

    const repeatBuyers = await Buyer.countDocuments({
      status: "Active",
      orders: { $gt: 1 }
    });

    const repeatBusinessRate =
      activeBuyers > 0
        ? Number(
            (
              (repeatBuyers / activeBuyers) *
              100
            ).toFixed(1)
          )
        : 0;

    const totalBuyers = await Buyer.countDocuments();

    const verifiedBuyers = await Buyer.countDocuments({
      verified: true
    });

    const verifiedBuyerRate =
      totalBuyers > 0
        ? Number(
            (
              (verifiedBuyers / totalBuyers) *
              100
            ).toFixed(1)
          )
        : 0;


    res.json({
      status: 1,

      data: {
        onTimeShipmentRate,

        shipmentAccuracy,

        documentCompliance,

        repeatBusinessRate,

        verifiedBuyerRate
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getGlobalTradeOverview = async (req, res) => {
  try {
    const globalOverview = await Shipment.aggregate([
      {
        $group: {
          _id: "$route.originCountry",
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          region: "$_id",
          value: 1
        }
      }
    ]);
    const regionMap = {
      Asia: [
        "India", "China", "Japan", "South Korea", "UAE",
        "Saudi Arabia", "Singapore", "Malaysia", "Thailand",
        "Indonesia", "Vietnam", "Bangladesh", "Pakistan"
      ],

      Europe: [
        "Germany", "France", "Italy", "Spain", "Netherlands",
        "Belgium", "Switzerland", "Austria", "Poland",
        "Sweden", "Norway", "Denmark", "Finland", "Ireland"
      ],

      "North America": [
        "USA", "United States", "Canada", "Mexico"
      ],

      "South America": [
        "Brazil", "Argentina", "Chile", "Colombia", "Peru",
        "Ecuador", "Uruguay", "Paraguay", "Bolivia"
      ],

      Africa: [
        "Egypt", "Nigeria", "South Africa", "Kenya",
        "Morocco", "Ghana", "Tanzania", "Algeria"
      ]
    };

    const regions = Object.entries(regionMap).map(
      ([region, countries]) => ({
        region,
        value: globalOverview
          .filter(item => countries.includes(item._id))
          .reduce((sum, item) => sum + item.value, 0)
      })
    );


    const total = globalOverview.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const data = globalOverview.map((item) => ({
      region: item.region,
      value: item.value,
      percent: total
        ? `${((item.value / total) * 100).toFixed(1)}%`
        : "0%"
    }));

    res.json({
      status: 1,
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};
exports.getTradeValueTrend = async (req, res) => {
  try {
    const trend = await Shipment.aggregate([
      {
        $match: {
          shipmentDate: {
            $ne: null
          }
        }
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$shipmentDate"
            }
          },

          tradeValue: {
            $sum: {
              $ifNull: ["$cargo.value", 0]
            }
          },

          shipments: {
            $sum: 1
          }
        }
      },

      {
        $sort: {
          _id: 1
        }
      }
    ]);


    res.json({
      status: 1,
      data: trend
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getTopTradingPartners = async (req, res) => {
  try {
    const buyers = await Shipment.aggregate([
      {
        $match: {
          "buyer.companyName": {
            $ne: null
          }
        }
      },

      {
        $group: {
          _id: "$buyer.companyName",

          country: {
            $first: "$buyer.country"
          },

          tradeValue: {
            $sum: {
              $ifNull: ["$cargo.value", 0]
            }
          },

          shipments: {
            $sum: 1
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


    res.json({
      status: 1,
      data: buyers
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getTopImportedProducts = async (req, res) => {
  try {
    const products = await Shipment.aggregate([
      {
        $match: {
          "route.destinationCountry": {
            $ne: null
          }
        }
      },

      {
        $group: {
          _id: "$cargo.productName",

          hsCode: {
            $first: "$cargo.hsCode"
          },

          quantity: {
            $sum: {
              $ifNull: ["$cargo.quantity", 0]
            }
          },

          tradeValue: {
            $sum: {
              $ifNull: ["$cargo.value", 0]
            }
          },

          shipments: {
            $sum: 1
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


    res.json({
      status: 1,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getTopExportDestinations = async (req, res) => {
  try {
    const destinations = await Shipment.aggregate([
      {
        $match: {
          "route.destinationCountry": {
            $ne: null
          }
        }
      },

      {
        $group: {
          _id: "$route.destinationCountry",

          shipments: {
            $sum: 1
          },

          tradeValue: {
            $sum: {
              $ifNull: ["$cargo.value", 0]
            }
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


    res.json({
      status: 1,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getRecentShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .select(`
        sbNumber
        referenceNumber
        exporter
        importer
        buyer
        cargo
        route
        shipmentStatus
        approvalStatus
        paymentStatus
        trackingStatus
        exceptionStatus
        shipmentDate
        etd
        eta
        currentLocation
        createdAt
      `)

      .populate(
        "cargo.hsCode",
        "hsCode productName"
      )

      .populate(
        "buyer.buyerId",
        "companyName location buyerType verified"
      )

      .sort({
        createdAt: -1
      })

      .limit(10);


    res.json({
      status: 1,
      data: shipments
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};