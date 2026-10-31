const Country = require("../models/country");
exports.createCountry = async (req, res) => {
  try {
    const data = await Country.create(req.body);
    res.json({ status: 1, data });
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getCountries = async (req, res) => {
  const data = await Country.find();
  res.json({ status: 1, data });
};