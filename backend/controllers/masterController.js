const MasterCategory = require("../models/MasterCategory");
exports.getCategories = async (req, res) => {
  const data = await MasterCategory.find();
  res.json({ status: 1, data });
};
exports.createCategory = async (req, res) => {
  const { name, key, prefix } = req.body;

  const data = await MasterCategory.create({
    name,
    key,
    prefix
  });

  res.json({ status: 1, data });
};