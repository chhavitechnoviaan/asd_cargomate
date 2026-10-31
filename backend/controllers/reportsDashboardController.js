const Report = require("../models/Report");
const Shipment = require("../models/Shipment");
const Supplier = require("../models/Supplier");
const Buyer = require("../models/Buyer");
const Contract = require("../models/Contract");
const TradeInvoice = require("../models/TradeInvoice");

exports.getDashboard = async (req, res) => {
    try {
  
      const totalTrade = await Shipment.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]);
  
      const totalShipments = await Shipment.countDocuments();
  
      const totalInvoices = await TradeInvoice.countDocuments();
  
      const activeSuppliers = await Supplier.countDocuments({
        active: true
      });
  
      const activeBuyers = await Buyer.countDocuments({
        status: "Active"
      });
  
      const contractValue = await Contract.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$value" }
          }
        }
      ]);
  
      res.json({
        status: 1,
        data: {
          totalTradeValue: totalTrade[0]?.total || 0,
          totalShipments,
          totalInvoices,
          activeSuppliers,
          totalContractValue: contractValue[0]?.total || 0,
          activeBuyers
        }
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getOverview = async (req, res) => {
    try {
  
      const tradeTrend = await Shipment.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$shipmentDate"
              }
            },
            tradeValue: {
              $sum: "$amount"
            },
            shipments: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            "_id.month": 1
          }
        }
      ]);
  
      const countries = await Shipment.aggregate([
        {
          $group: {
            _id: "$route.destination",
            tradeValue: {
              $sum: "$amount"
            }
          }
        },
        {
          $sort: {
            tradeValue: -1
          }
        },
        {
          $limit: 5
        }
      ]);
  
      res.json({
        status: 1,
        data: {
          tradeTrend,
          countries
        }
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getRecentReports = async (req, res) => {
    try {
  
      const reports = await Report.find({
        isDeleted: false
      })
        .populate("userId", "name")
        .sort({
          createdAt: -1
        })
        .limit(10);
  
      res.json({
        status: 1,
        data: reports
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getPopularReports = async (req, res) => {
    try {
  
      const reports = await Report.find({
        isDeleted: false
      })
        .sort({
          totalDownloads: -1,
          totalViews: -1
        })
        .limit(10);
  
      res.json({
        status: 1,
        data: reports
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

        const reports = await Report.countDocuments({
            isDeleted: false
        });

        const downloads = await Report.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalDownloads"
                    }
                }
            }
        ]);

        const views = await Report.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalViews"
                    }
                }
            }
        ]);

        res.json({
            status: 1,
            data: {
                totalReports: reports,
                totalDownloads: downloads[0]?.total || 0,
                totalViews: views[0]?.total || 0
            }
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.generateReport = async (req, res) => {
    try {

        const report = await Report.create(req.body);

        res.status(201).json({
            status: 1,
            message: "Report generated successfully",
            data: report
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.downloadReport = async (req, res) => {
    try {

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                status: 0,
                message: "Report not found"
            });
        }

        report.totalDownloads += 1;

        await report.save();

        res.json({
            status: 1,
            data: report
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.exportData = async (req, res) => {
    try {

        const reports = await Report.find({
            isDeleted: false
        });

        res.json({
            status: 1,
            total: reports.length,
            data: reports
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

        const categories = await Report.distinct("category");

        const modules = await Report.distinct("module");

        const status = await Report.distinct("status");

        const frequency = await Report.distinct("frequency");

        res.json({
            status: 1,
            data: {
                categories,
                modules,
                status,
                frequency
            }
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

