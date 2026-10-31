const Shipment = require("../models/Shipment");
const Supplier = require("../models/Supplier");

exports.getDashboard = async (req, res) => {
    try {

        const totalSuppliers = await Supplier.countDocuments();

        const activeSuppliers = await Supplier.countDocuments({
            active: true
        });

        const countries = await Supplier.distinct("country");

        const totalProducts = await Supplier.aggregate([
            {
                $project: {
                    totalProducts: {
                        $size: "$products"
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalProducts"
                    }
                }
            }
        ]);

        const shipmentStats = await Shipment.aggregate([
            {
                $group: {
                    _id: null,
                    shipments: {
                        $sum: 1
                    },
                    tradeValue: {
                        $sum: "$cargo.value"
                    }
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Supplier dashboard fetched successfully",
            data: {
                totalSuppliers,
                activeSuppliers,
                countriesCovered: countries.length,
                productsCovered: totalProducts[0]?.total || 0,
                totalShipments: shipmentStats[0]?.shipments || 0,
                totalTradeValue: shipmentStats[0]?.tradeValue || 0
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopCountries = async (req, res) => {
    try {

        const countries = await Supplier.aggregate([
            {
                $group: {
                    _id: "$country",
                    suppliers: {
                        $sum: 1
                    },
                    tradeValue: {
                        $sum: "$totalTradeValue"
                    }
                }
            },
            {
                $sort: {
                    suppliers: -1
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Top supplier countries fetched successfully",
            data: countries
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


exports.getSupplierTypes = async (req, res) => {
    try {

        const types = await Supplier.aggregate([
            {
                $group: {
                    _id: "$supplierType",
                    suppliers: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    suppliers: -1
                }
            }
        ]);

        return res.status(200).json({
            status: 1,
            message: "Supplier types fetched successfully",
            data: types
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getQualityDistribution = async (req, res) => {
    try {

        const ranges = {
            "0-20": 0,
            "21-40": 0,
            "41-60": 0,
            "61-80": 0,
            "81-100": 0
        };

        const suppliers = await Supplier.find({}, "qualityScore");

        suppliers.forEach(item => {

            const score = item.qualityScore || 0;

            if (score <= 20) ranges["0-20"]++;
            else if (score <= 40) ranges["21-40"]++;
            else if (score <= 60) ranges["41-60"]++;
            else if (score <= 80) ranges["61-80"]++;
            else ranges["81-100"]++;

        });

        return res.status(200).json({
            status: 1,
            message: "Quality distribution fetched successfully",
            data: ranges
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getTopCertifications = async (req, res) => {
  try {

    const certifications = await Supplier.aggregate([
      {
        $unwind: "$certifications"
      },
      {
        $group: {
          _id: "$certifications",
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1
        }
      }
    ]);

    return res.status(200).json({
      status: 1,
      message: "Top certifications fetched successfully",
      data: certifications
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.getTopSuppliers = async (req, res) => {
    try {

        const suppliers = await Supplier.find()
            .sort({
                qualityScore: -1,
                totalTradeValue: -1
            })
            .limit(10);

        return res.status(200).json({
            status: 1,
            message: "Top suppliers fetched successfully",
            data: suppliers
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

exports.getSupplierSpotlight = async (req, res) => {
    try {

        const supplier = await Supplier.findById(req.params.supplierId);

        if (!supplier) {
            return res.status(404).json({
                status: 0,
                message: "Supplier not found"
            });
        }

        const recentShipments = await Shipment.find({
            "supplier.companyName": supplier.companyName
        })
        .sort({ shipmentDate: -1 })
        .limit(5)
        .select("cargo.productName cargo.hsCode shipmentDate cargo.value");

        return res.status(200).json({
            status: 1,
            message: "Supplier spotlight fetched successfully",
            data: {
                supplier,
                recentShipments
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};



exports.getRecentShipments = async (req, res) => {
    try {

        const supplierId = req.query.supplierId;

        const filter = {};

        if (supplierId) {
            filter["supplier.supplierId"] = supplierId;
        }

        const shipments = await Shipment.find(filter)
            .populate("cargo.hsCode", "hsCode description")
            .sort({ shipmentDate: -1 })
            .limit(10);

        return res.status(200).json({
            status: 1,
            message: "Recent shipments fetched successfully",
            data: shipments
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};


exports.getFilterOptions = async (req, res) => {
    try {

        const hsCodes = await Shipment.distinct("cargo.productName");

        const countries = await Supplier.distinct("country");

        const supplierTypes = await Supplier.distinct("supplierType");

        const certifications = await Supplier.distinct("certifications");

        const shipmentRanges = [
            100,
            500,
            1000,
            5000,
            10000
        ];

        const tradeValueRanges = [
            100000,
            500000,
            1000000,
            5000000,
            10000000
        ];

        return res.status(200).json({
            status: 1,
            message: "Filter options fetched successfully",
            data: {
                hsCodes,
                countries,
                shipmentRanges,
                tradeValueRanges,
                supplierTypes,
                certifications
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};