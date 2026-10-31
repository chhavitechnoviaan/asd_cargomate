const MasterItem = require("../models/MasterItem");
const MasterCategory = require("../models/MasterCategory");
exports.getItems = async (req, res) => {
  const { categoryId } = req.params;

  const items = await MasterItem.find({ categoryId });

  res.json({
    status: 1,
    data: items
  });
};

exports.createItem = async (req, res) => {
    const { categoryId, name } = req.body;
  
    const category = await MasterCategory.findById(categoryId);
  
    if (!category) {
      return res.status(400).json({
        status: 0,
        message: "Category not found"
      });
    }
  
    const code = await generateCode(category);
  
    const item = await MasterItem.create({
      categoryId,
      name,
      code
    });
  
    res.json({
      status: 1,
      data: item
    });
  };

  exports.updateItem = async (req, res) => {
    const updated = await MasterItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.json({ status: 1, data: updated });
  };

  exports.deleteItem = async (req, res) => {
    await MasterItem.findByIdAndDelete(req.params.id);
  
    res.json({
      status: 1,
      message: "Deleted"
    });
  };

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


const generateCode = async (category) => {
  const count = await MasterItem.countDocuments({
    categoryId: category._id
  });

  const next = count + 1;

  return `${category.prefix}-${String(next).padStart(3, "0")}`;
};