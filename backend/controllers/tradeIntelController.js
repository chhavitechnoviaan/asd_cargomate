const Company = require("../models/Company");
const TradeIntelligence = require("../models/TradeIntelligence");
const TradeInsight = require("../models/TradeInsight");
exports.getMapData = async (req, res) => {
  const data = await TradeIntelligence.aggregate([
    {
      $group: {
        _id: "$country",
        value: { $sum: "$exportValue" }
      }
    }
  ]);

  res.json({
    status: 1,
    data: data.map(d => ({
      country: d._id,
      value: d.value
    }))
  });
};
exports.getInsights = async (req, res) => {
  const insights = await TradeInsight.find();

  const formatted = insights.map(i => ({
    tag:
      i.type === "market"
        ? "Top Growing Market"
        : i.type === "product"
        ? "High Demand Product"
        : "Best Shipping Route",
    title: i.title,
    desc: i.description
  }));

  res.json({
    status: 1,
    data: formatted
  });
};
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.json({
      status: 1,
      message: "Company created",
      data: company
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getCompanies = async (req, res) => {
  const { type = "buyer", page = 1, limit = 10 } = req.query;

  const data = await Company.find({ type })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const formatted = data.map(c => ({
    id: c._id,
    company: c.company,
    subtitle: c.subtitle,
    verified: c.verified,
    location: `🇮🇳 ${c.location.city}, ${c.location.state} ${c.location.country}`,
    product: c.product,
    freq: c.tradeFrequency,
    volume: `$${(c.tradeVolume / 1000000).toFixed(2)}M`,
    lastActivity: c.lastActivity
    ? new Date(c.lastActivity).toDateString()
    : "-"
  }));

  res.json({
    status: 1,
    data: formatted
  });
};

exports.createInsight = async (req, res) => {
  try {
    const data = await TradeInsight.create(req.body);

    res.json({
      status: 1,
      message: "Insight added",
      data
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getFilters = async (req, res) => {
  try {
    const products = await Company.distinct("product");
    const countries = await Company.distinct("location.country");

    res.json({
      status: 1,
      data: {
        products,
        countries
      }
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};