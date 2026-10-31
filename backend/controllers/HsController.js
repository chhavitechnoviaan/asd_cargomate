const mongoose = require("mongoose");
const HSCode = require("../models/HSCode");
const MasterItem = require("../models/MasterItem");
exports.createHSCode = async (req, res) => {
  try {

    let data = req.body;
    console.log("👉 RECEIVED DATA:", data);
    if (data.hsCode) {
      data.hsCode = data.hsCode.replace(/\./g, "").trim();
    }
    if (!data.hsCode || !data.productName) {
      return res.status(400).json({
        status: 0,
        message: "HS Code & Product Name required"
      });
    }
    const exists = await HSCode.findOne({ hsCode: data.hsCode });
    if (exists) {
      return res.status(400).json({
        status: 0,
        message: "HS Code already exists"
      });
    }
if (data.category) {
  if (!mongoose.Types.ObjectId.isValid(data.category)) {
    return res.status(400).json({
      status: 0,
      message: "Invalid Category ID"
    });
  }
}
if (data.industry) {
  if (!mongoose.Types.ObjectId.isValid(data.industry)) {
    return res.status(400).json({
      status: 0,
      message: "Invalid Industry ID"
    });
  }

  const industryExists = await MasterItem.findOne({
    _id: data.industry,
    categoryId: data.category // 🔥 VERY IMPORTANT
  });

  if (!industryExists) {
    return res.status(400).json({
      status: 0,
      message: "Industry does not belong to selected category"
    });
  }
}

    const hs = await HSCode.create(data);

    res.json({
      status: 1,
      message: "HS Code created",
      data: hs
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getHSCodes = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const query = {
      status: { $ne: "inactive" },
      $or: [
        { hsCode: { $regex: search, $options: "i" } },
        { productName: { $regex: search, $options: "i" } }
      ]
    };

    const data = await HSCode.find(query)
      .populate("category industry")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await HSCode.countDocuments(query);

    res.json({
      status: 1,
      data,
      total
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getSingleHSCode = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid ID"
      });
    }

    const data = await HSCode.findById(id)
      .populate("category industry");

    if (!data) {
      return res.status(404).json({
        status: 0,
        message: "HS Code not found"
      });
    }

    res.json({
      status: 1,
      data
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.updateHSCode = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid ID"
      });
    }
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: 0,
        message: "No data provided for update"
      });
    }
    if (req.body.hsCode) {
      req.body.hsCode = req.body.hsCode.replace(/\./g, "").trim();
    }

    const updated = await HSCode.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // 🔥 important
    );

    if (!updated) {
      return res.status(404).json({
        status: 0,
        message: "HS Code not found"
      });
    }

    res.json({
      status: 1,
      message: "HS Code updated",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.deleteHSCode = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid ID"
      });
    }

    const hs = await HSCode.findById(id);

    if (!hs) {
      return res.status(404).json({
        status: 0,
        message: "HS Code not found"
      });
    }
    if (hs.status === "inactive") {
      return res.status(400).json({
        status: 0,
        message: "HS Code already inactive"
      });
    }

    hs.status = "inactive";
    await hs.save();

    res.json({
      status: 1,
      message: "HS Code deactivated"
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};