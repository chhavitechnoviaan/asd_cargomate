
const Shipment = require("../models/Shipment");
const Document = require("../models/Document");
const Incentive = require("../models/Incentive");
const Activity = require("../models/Activity");
const User = require("../models/user");
const HSCode = require("../models/HSCode");
const Freight = require("../models/freight");

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const activeShipments = await Shipment.countDocuments({
      userId,
      status: { $in: ["Pending", "In Transit"] }
    });

    const incentiveBreakdown = await Incentive.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: "$scheme",
            total: { $sum: "$amount" }
          }
        }
      ]);

      const lastFreight = await Freight.findOne({ userId })
  .sort({ createdAt: -1 });

    const pendingDocs = await Shipment.countDocuments({
      userId,
      docsPending: true
    });

    const user = await User.findById(userId);

    const incentiveAgg = await Incentive.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const shipmentOverview = await Shipment.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let overview = {
        pending: 0,
        inTransit: 0,
        delayed: 0,
        delivered: 0
      };
      
      shipmentOverview.forEach(item => {
        if (item._id === "Pending") overview.pending = item.count;
        if (item._id === "In Transit") overview.inTransit = item.count;
        if (item._id === "Delayed") overview.delayed = item.count;
        if (item._id === "Delivered") overview.delivered = item.count;
      });
    const recentShipments = await Shipment.find({ userId })
      .populate("cargo.hsCode")
      .sort({ createdAt: -1 })
      .limit(5);
    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);
    const lastShipment = await Shipment.findOne({ userId })
      .populate("cargo.hsCode")
      .sort({ createdAt: -1 });

    let hsSummary = null;

    if (lastShipment?.cargo?.hsCode) {
      const hs = lastShipment.cargo.hsCode;

      hsSummary = {
        code: hs.hsCode,
        gst: hs.tradeInfo?.gst || 0,
        duty: hs.tradeInfo?.exportDuty || 0
      };
    }
    res.json({
        status: 1,
        data: {
          kpis: {
            activeShipments,
            pendingDocs,
            aiQueriesLeft: user.aiLimit - user.aiUsed,
            incentiveSavings: incentiveAgg[0]?.total || 0
          },
      
          shipmentOverview: overview,
          recentShipments,
          activities,
      
          hsSummary,
      
          incentiveBreakdown, 
          lastFreight 
        }
      });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};