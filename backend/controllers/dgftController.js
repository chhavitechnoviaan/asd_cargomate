const DgftScheme = require("../models/DgftScheme");

exports.createScheme = async (req, res) => {
  try {
    const { name, code, year, description, benefits } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        status: 0,
        message: "Name & Code required"
      });
    }

    const exists = await DgftScheme.findOne({ code });
    if (exists) {
      return res.status(400).json({
        status: 0,
        message: "Scheme already exists"
      });
    }

    const scheme = await DgftScheme.create({
      name,
      code,
      year,
      description,
      benefits
    });

    res.json({
      status: 1,
      message: "Scheme created",
      data: scheme
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

exports.getSchemes = async (req, res) => {
    try {
      const { search = "", status } = req.query;
  
      let query = {};
  
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
  
      if (status) {
        query.status = status;
      }
  
      const data = await DgftScheme.find(query).sort({ createdAt: -1 });
  
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

  exports.getSingleScheme = async (req, res) => {
    const data = await DgftScheme.findById(req.params.id);
  
    res.json({
      status: 1,
      data
    });
  };

  exports.updateScheme = async (req, res) => {
    const updated = await DgftScheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
  
    res.json({
      status: 1,
      data: updated
    });
  };

  exports.deleteScheme = async (req, res) => {
    await DgftScheme.findByIdAndUpdate(req.params.id, {
      status: "inactive"
    });
  
    res.json({
      status: 1,
      message: "Scheme deactivated"
    });
  };

  exports.getStats = async (req, res) => {
    try {
      const totalSchemes = await DgftScheme.countDocuments();
  
      const activeSchemes = await DgftScheme.countDocuments({
        status: "active"
      });
  
      const applicants = await DgftScheme.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$applicantsCount" }
          }
        }
      ]);
  
      const benefits = await DgftScheme.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$benefitsClaimed" }
          }
        }
      ]);
  
      res.json({
        status: 1,
        data: {
          totalSchemes,
          activeSchemes,
          totalApplicants: applicants[0]?.total || 0,
          benefitsClaimed: benefits[0]?.total || 0
        }
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };