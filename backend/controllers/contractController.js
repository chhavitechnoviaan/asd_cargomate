const Contract = require("../models/Contract");

exports.getDashboard = async (req, res) => {
    try {
  
      const totalContracts = await Contract.countDocuments();
  
      const activeContracts = await Contract.countDocuments({
        status: "Active"
      });
  
      const expiringSoon = await Contract.countDocuments({
        status: "Expiring Soon"
      });
  
      const expiredContracts = await Contract.countDocuments({
        status: "Expired"
      });
  
      const totalValue = await Contract.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$value" },
            avg: { $avg: "$value" }
          }
        }
      ]);
  
      res.json({
        status: 1,
        data: {
          totalContracts,
          activeContracts,
          expiringSoon,
          expiredContracts,
          totalContractValue: totalValue[0]?.total || 0,
          averageContractValue: totalValue[0]?.avg || 0
        }
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getContracts = async (req, res) => {
    try {
  
      const {
        search,
        status,
        type,
        country
      } = req.query;
  
      let filter = {};
  
      if (search) {
        filter.$or = [
          {
            contractNo: {
              $regex: search,
              $options: "i"
            }
          },
          {
            contractName: {
              $regex: search,
              $options: "i"
            }
          },
          {
            party: {
              $regex: search,
              $options: "i"
            }
          }
        ];
      }
  
      if (status) filter.status = status;
  
      if (type) filter.type = type;
  
      if (country) filter.country = country;
  
      const contracts = await Contract.find(filter)
        .sort({
          createdAt: -1
        });
  
      res.json({
        status: 1,
        data: contracts
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };


  exports.getStatusSummary = async (req, res) => {
    try {
  
      const data = await Contract.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]);
  
      res.json({
        status: 1,
        data
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getTypeSummary = async (req, res) => {
    try {
  
      const data = await Contract.aggregate([
        {
          $group: {
            _id: "$type",
            count: {
              $sum: 1
            }
          }
        }
      ]);
  
      res.json({
        status: 1,
        data
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getTopParties = async (req, res) => {
    try {
  
      const data = await Contract.aggregate([
        {
          $group: {
            _id: "$party",
            totalValue: {
              $sum: "$value"
            }
          }
        },
        {
          $sort: {
            totalValue: -1
          }
        },
        {
          $limit: 5
        }
      ]);
  
      res.json({
        status: 1,
        data
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getInsights = async (req, res) => {
    try {
  
      const active = await Contract.countDocuments({
        status: "Active"
      });
  
      const expiring = await Contract.countDocuments({
        status: "Expiring Soon"
      });
  
      const totalValue = await Contract.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$value"
            }
          }
        }
      ]);
  
      res.json({
        status: 1,
        data: {
          activeContracts: active,
          expiringSoon: expiring,
          totalContractValue: totalValue[0]?.total || 0
        }
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getValueTrend = async (req, res) => {
    try {
  
      const trend = await Contract.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$createdAt"
              }
            },
            value: {
              $sum: "$value"
            }
          }
        },
        {
          $sort: {
            "_id.month": 1
          }
        }
      ]);
  
      res.json({
        status: 1,
        data: trend
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getExpiringContracts = async (req, res) => {
    try {
  
      const data = await Contract.find({
        status: "Expiring Soon"
      })
        .sort({
          endDate: 1
        })
        .limit(10);
  
      res.json({
        status: 1,
        data
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getFilterOptions = async (req, res) => {
    try {
  
      const countries = await Contract.distinct("country");
  
      const types = await Contract.distinct("type");
  
      const status = await Contract.distinct("status");
  
      res.json({
        status: 1,
        data: {
          countries,
          types,
          status
        }
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  