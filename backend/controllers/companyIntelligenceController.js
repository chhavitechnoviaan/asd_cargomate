const Company=require("../models/Company");
const Shipment=require("../models/Shipment");
const HSCode=require("../models/HSCode");

exports.getDashboard=async(req,res)=>{
    try{
    
    const dashboard=await Company.aggregate([
    {
    $group:{
    _id:null,
    totalCompanies:{
    $sum:1
    },
    totalShipments:{
    $sum:"$totalShipments"
    },
    totalTradeValue:{
    $sum:"$tradeVolume"
    },
    avgShipmentValue:{
    $avg:"$tradeVolume"
    },
    avgLeadTime:{
    $avg:"$leadTime"
    }
    }
    }
    ]);
    
    const countries=await Company.distinct("location.country");
    
    res.json({
    status:1,
    data:{
    totalCompanies:dashboard[0]?.totalCompanies||0,
    totalShipments:dashboard[0]?.totalShipments||0,
    totalTradeValue:dashboard[0]?.totalTradeValue||0,
    countriesCovered:countries.length,
    avgShipmentValue:dashboard[0]?.avgShipmentValue||0,
    avgLeadTime:dashboard[0]?.avgLeadTime||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getCompanyProfile=async(req,res)=>{
        try{
        
        const{id}=req.params;
        
        const company=await Company.findOne().sort({ createdAt: -1 });
        
        if(!company){
        
        return res.status(404).json({
        status:0,
        message:"Company not found"
        });
        
        }
        
        res.json({
        status:1,
        data:company
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getTopHSCodes = async (req, res) => {
  try {
    const topHSCodes = await Shipment.aggregate([
      {
        $match: {
          "cargo.hsCode": { $ne: null }
        }
      },
      {
        $lookup: {
          from: "hscodes",
          localField: "cargo.hsCode",
          foreignField: "_id",
          as: "hsCode"
        }
      },
      {
        $unwind: "$hsCode"
      },
      {
        $group: {
          _id: "$hsCode.hsCode",
          productName: { $first: "$hsCode.productName" },
          description: { $first: "$hsCode.description" },
          tradeValue: {
            $sum: { $ifNull: ["$cargo.value", 0] }
          },
          shipments: {
            $sum: 1
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
      data: topHSCodes
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};


// TOP TRADING PARTNERS
exports.getTopTradingPartners = async (req, res) => {
  try {
    const topTradingPartners = await Shipment.aggregate([
      {
        $match: {
          "route.destinationCountry": {
            $exists: true,
            $ne: ""
          }
        }
      },
      {
        $group: {
          _id: "$route.destinationCountry",

          tradeValue: {
            $sum: { $ifNull: ["$cargo.value", 0] }
          },

          shipments: {
            $sum: 1
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
      data: topTradingPartners
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

        exports.getTradeTrend=async(req,res)=>{
            try{
            
            const trend=await Shipment.aggregate([
            {
            $group:{
            _id:{
            $dateToString:{
            format:"%Y-%m-%d",
            date:"$shipmentDate"
            }
            },
            tradeValue:{
            $sum:"$cargo.value"
            },
            shipments:{
            $sum:1
            }
            }
            },
            {
            $sort:{
            _id:1
            }
            }
            ]);
            
            res.json({
            status:1,
            data:trend
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };


            exports.getImportExportChart=async(req,res)=>{
                try{
                
                const imports=await Shipment.aggregate([
                {
                $match:{
                 "importer.companyName": {
            $exists: true,
            $ne: ""
          }
                }
                },
                {
                $group:{
                _id:null,
                value:{
                $sum:"$cargo.value"
                }
                }
                }
                ]);
                
                const exportsData=await Shipment.aggregate([
                {
                $match:{
               "exporter.companyName": {
            $exists: true,
            $ne: ""
          }
                }
                },
                {
                $group:{
                _id:null,
                value:{
                $sum:"$cargo.value"
                }
                }
                }
                ]);
                
                res.json({
                status:1,
                data:{
                importValue:imports[0]?.value||0,
                exportValue:exportsData[0]?.value||0
                }
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };


                exports.getShipmentTrend=async(req,res)=>{
                    try{
                    
                    const trend=await Shipment.aggregate([
                    {
                    $group:{
                    _id:{
                    $dateToString:{
                    format:"%Y-%m-%d",
                    date:"$shipmentDate"
                    }
                    },
                    shipments:{
                    $sum:1
                    }
                    }
                    },
                    {
                    $sort:{
                    _id:1
                    }
                    }
                    ]);
                    
                    res.json({
                    status:1,
                    data:trend
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };


                    exports.getTopProducts=async(req,res)=>{
                        try{
                        
                        const products=await Shipment.aggregate([
                        {
                        $lookup:{
                        from:"hscodes",
                        localField:"cargo.hsCode",
                        foreignField:"_id",
                        as:"hsCode"
                        }
                        },
                        {
                        $unwind:"$hsCode"
                        },
                        {
                        $group:{
                        _id:"$hsCode.productName",
                        tradeValue:{
                        $sum:"$cargo.value"
                        },
                        shipments:{
                        $sum:1
                        }
                        }
                        },
                        {
                        $sort:{
                        tradeValue:-1
                        }
                        },
                        {
                        $limit:10
                        }
                        ]);
                        
                        res.json({
                        status:1,
                        data:products
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getRecentShipments=async(req,res)=>{
                            try{
                            
                            const shipments=await Shipment.find()
                            .populate("cargo.hsCode","hsCode productName")
                            .sort({
                            shipmentDate:-1
                            })
                            .limit(10);
                            
                            res.json({
                            status:1,
                            data:shipments
                            });
                            
                            }catch(error){
                            
                            res.status(500).json({
                            status:0,
                            message:error.message
                            });
                            
                            }
                            };

                            exports.getTopCountries=async(req,res)=>{
                                try{
                                
                                const countries=await Shipment.aggregate([
                                {
                                $group:{
                                _id:"$route.destinationCountry",
                                tradeValue:{
                                $sum:"$cargo.value"
                                },
                                shipments:{
                                $sum:1
                                }
                                }
                                },
                                {
                                $sort:{
                                tradeValue:-1
                                }
                                },
                                {
                                $limit:10
                                }
                                ]);
                                
                                res.json({
                                status:1,
                                data:countries
                                });
                                
                                }catch(error){
                                
                                res.status(500).json({
                                status:0,
                                message:error.message
                                });
                                
                                }
                                };

                                exports.getFinancialSnapshot = async (req, res) => {
                                    try {
                                
                                        const financial = await Company.aggregate([
                                            {
                                                $group: {
                                                    _id: null,
                                                    annualTurnover: { $sum: "$annualTurnover" },
                                                    exportTurnover: { $sum: "$exportTurnover" },
                                                    importTurnover: { $sum: "$importTurnover" },
                                                    netProfit: { $sum: "$netProfit" },
                                                    avgExportRatio: { $avg: "$exportRatio" }
                                                }
                                            }
                                        ]);
                                
                                        return res.status(200).json({
                                            status: 1,
                                            message: "Financial snapshot fetched successfully",
                                            data: financial[0] || {}
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
                                
                                        const companies = await Company.find({}, "_id company");
                                
                                        const countries = await Company.distinct("location.country");
                                
                                        const industries = await Company.distinct("industry");
                                
                                        const businessTypes = await Company.distinct("businessType");
                                
                                        const products = await Shipment.distinct("cargo.productName");
                                
                                        const hsCodes = await HSCode.find({}, "_id hsCode productName");
                                
                                        return res.status(200).json({
                                            status: 1,
                                            message: "Filter options fetched successfully",
                                            data: {
                                                companies,
                                                countries,
                                                industries,
                                                businessTypes,
                                                products,
                                                hsCodes
                                            }
                                        });
                                
                                    } catch (error) {
                                
                                        return res.status(500).json({
                                            status: 0,
                                            message: error.message
                                        });
                                
                                    }
                                };

                                exports.getCompanyDetails = async (req, res) => {
                                    try {
                                
                                        const { id } = req.params;
                                
                                        const company = await Company.findById(id);
                                
                                        if (!company) {
                                            return res.status(404).json({
                                                status: 0,
                                                message: "Company not found"
                                            });
                                        }
                                
                                        const shipments = await Shipment.find({
                                            $or: [
                                                { "exporter.companyName": company.company },
                                                { "importer.companyName": company.company }
                                            ]
                                        })
                                        .populate("cargo.hsCode", "hsCode productName")
                                        .sort({ shipmentDate: -1 })
                                        .limit(10);
                                
                                        return res.status(200).json({
                                            status: 1,
                                            message: "Company details fetched successfully",
                                            data: {
                                                company,
                                                recentShipments: shipments
                                            }
                                        });
                                
                                    } catch (error) {
                                
                                        return res.status(500).json({
                                            status: 0,
                                            message: error.message
                                        });
                                
                                    }
                                };
                                