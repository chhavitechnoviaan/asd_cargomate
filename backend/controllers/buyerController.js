const Buyer = require("../models/Buyer");
exports.getBuyers = async (req, res) => {
  try {
    const { country, product, page = 1, limit = 10 } = req.query;

    let query = {};

    if (country) query["location.country"] = country;
    if (product) {
      query.products = { $in: [product] };
    }

    const buyers = await Buyer.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Buyer.countDocuments(query);

    res.json({
      status: 1,
      data: buyers,
      total
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.createBuyer = async (req, res) => {
  const buyer = await Buyer.create(req.body);

  res.json({
    status: 1,
    data: buyer
  });
};