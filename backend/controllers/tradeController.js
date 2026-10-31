const TradeData = require("../models/TradeData");
exports.getStats = async (req, res) => {
  try {
    const { country, product } = req.query;

    const data = await TradeData.find({ country, product });

    const totalExport = data.reduce((a, b) => a + b.exportValue, 0);
    const totalBuyers = data.reduce((a, b) => a + b.buyersCount, 0);

    const avgOrderValue = totalExport / (totalBuyers || 1);

    res.json({
      status: 1,
      data: {
        totalExport,
        totalBuyers,
        avgOrderValue,
        growth: 18.6 // static for now (can calculate later)
      }
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getTrend = async (req, res) => {
  const { country, product } = req.query;

  const data = await TradeData.find({ country, product })
    .sort({ month: 1 });

  res.json({
    status: 1,
    data
  });
};
exports.getMapData = async (req, res) => {
  const data = await TradeData.aggregate([
    {
      $group: {
        _id: "$country",
        total: { $sum: "$exportValue" }
      }
    },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);

  res.json({
    status: 1,
    data
  });
};