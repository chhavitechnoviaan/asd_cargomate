const MasterCategory = require("../models/MasterCategory");
exports.getCategories = async (req, res) => {
  const categories = await MasterCategory.find();
  res.json({ status: 1, data: categories });
};
exports.createCategory = async (req, res) => {
  const { name, key, prefix } = req.body;

  const category = await MasterCategory.create({
    name,
    key,
    prefix
  });

  res.json({ status: 1, data: category });
};