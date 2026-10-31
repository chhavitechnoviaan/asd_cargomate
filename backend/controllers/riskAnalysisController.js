const RiskAnalysis=require("../models/RiskAnalysis");
const Shipment=require("../models/Shipment");
const HSCode=require("../models/HSCode");

exports.getDashboard=async(req,res)=>{
    try{
    
    const dashboard=await RiskAnalysis.aggregate([
    {
    $group:{
    _id:null,
    overallRisk:{
    $avg:"$riskScore"
    },
    highRisk:{
    $sum:{
    $cond:[
    {$eq:["$riskLevel","High"]},
    1,
    0
    ]
    }
    },
    mediumRisk:{
    $sum:{
    $cond:[
    {$eq:["$riskLevel","Medium"]},
    1,
    0
    ]
    }
    },
    lowRisk:{
    $sum:{
    $cond:[
    {$eq:["$riskLevel","Low"]},
    1,
    0
    ]
    }
    },
    shipmentsAffected:{
    $sum:1
    }
    }
    }
    ]);
    
    const countries=await RiskAnalysis.distinct("country");
    
    res.json({
    status:1,
    data:{
    overallRisk:dashboard[0]?.overallRisk||0,
    highRisk:dashboard[0]?.highRisk||0,
    mediumRisk:dashboard[0]?.mediumRisk||0,
    lowRisk:dashboard[0]?.lowRisk||0,
    countriesAtRisk:countries.length,
    shipmentsAffected:dashboard[0]?.shipmentsAffected||0
    }
    });
    
    }catch(error){
    res.status(500).json({
    status:0,
    message:error.message
    });
    }
    };

    exports.getRiskMap=async(req,res)=>{
        try{
        
        const map=await RiskAnalysis.aggregate([
        {
        $group:{
        _id:"$country",
        riskScore:{
        $avg:"$riskScore"
        },
        riskLevel:{
        $first:"$riskLevel"
        },
        alerts:{
        $sum:1
        }
        }
        },
        {
        $sort:{
        riskScore:-1
        }
        }
        ]);
        
        res.json({
        status:1,
        data:map
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };


        exports.getRiskDistribution=async(req,res)=>{
            try{
            
            const distribution=await RiskAnalysis.aggregate([
            {
            $group:{
            _id:"$riskLevel",
            count:{
            $sum:1
            }
            }
            },
            {
            $sort:{
            count:-1
            }
            }
            ]);
            
            res.json({
            status:1,
            data:distribution
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
                
                const countries=await RiskAnalysis.aggregate([
                {
                $group:{
                _id:"$country",
                riskScore:{
                $avg:"$riskScore"
                },
                alerts:{
                $sum:1
                }
                }
                },
                {
                $sort:{
                riskScore:-1
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

                exports.getRiskCategories=async(req,res)=>{
                    try{
                    
                    const categories=await RiskAnalysis.aggregate([
                    {
                    $group:{
                    _id:"$riskCategory",
                    count:{
                    $sum:1
                    },
                    avgRisk:{
                    $avg:"$riskScore"
                    }
                    }
                    },
                    {
                    $sort:{
                    count:-1
                    }
                    }
                    ]);
                    
                    res.json({
                    status:1,
                    data:categories
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getRecentAlerts=async(req,res)=>{
                        try{
                        
                        const alerts=await RiskAnalysis.find({
                        riskLevel:{
                        $in:["High","Very High"]
                        }
                        })
                        .populate("shipment")
                        .populate("hsCode","hsCode productName")
                        .sort({
                        createdAt:-1
                        })
                        .limit(10);
                        
                        res.json({
                        status:1,
                        data:alerts
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getRiskTrend=async(req,res)=>{
                            try{
                            
                            const trend=await RiskAnalysis.aggregate([
                            {
                            $group:{
                            _id:{
                            $dateToString:{
                            format:"%Y-%m-%d",
                            date:"$createdAt"
                            }
                            },
                            avgRisk:{
                            $avg:"$riskScore"
                            },
                            alerts:{
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

                            exports.getTopRiskHSCodes=async(req,res)=>{
                                try{
                                
                                const hsCodes=await RiskAnalysis.aggregate([
                                {
                                $lookup:{
                                from:"hscodes",
                                localField:"hsCode",
                                foreignField:"_id",
                                as:"hs"
                                }
                                },
                                {
                                $unwind:"$hs"
                                },
                                {
                                $group:{
                                _id:"$hs.hsCode",
                                product:{
                                $first:"$hs.productName"
                                },
                                avgRisk:{
                                $avg:"$riskScore"
                                },
                                alerts:{
                                $sum:1
                                }
                                }
                                },
                                {
                                $sort:{
                                avgRisk:-1
                                }
                                },
                                {
                                $limit:10
                                }
                                ]);
                                
                                res.json({
                                status:1,
                                data:hsCodes
                                });
                                
                                }catch(error){
                                
                                res.status(500).json({
                                status:0,
                                message:error.message
                                });
                                
                                }
                                };


                                exports.getShipmentsAtRisk=async(req,res)=>{
                                    try{
                                    
                                    const shipments=await RiskAnalysis.find()
                                    .populate({
                                    path:"shipment",
                                    populate:{
                                    path:"cargo.hsCode",
                                    select:"hsCode productName"
                                    }
                                    })
                                    .populate("hsCode","hsCode productName")
                                    .sort({
                                    riskScore:-1
                                    })
                                    .limit(20);
                                    
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

                                    exports.getFilterOptions=async(req,res)=>{
                                        try{
                                        
                                        const countries=await RiskAnalysis.distinct("country");
                                        
                                        const riskLevels=await RiskAnalysis.distinct("riskLevel");
                                        
                                        const riskCategories=await RiskAnalysis.distinct("riskCategory");
                                        
                                        const hsCodes=await HSCode.find({},{
                                        hsCode:1,
                                        productName:1
                                        });
                                        
                                        res.json({
                                        status:1,
                                        data:{
                                        countries,
                                        riskLevels,
                                        riskCategories,
                                        hsCodes
                                        }
                                        });
                                        
                                        }catch(error){
                                        
                                        res.status(500).json({
                                        status:0,
                                        message:error.message
                                        });
                                        
                                        }
                                        };

                                        