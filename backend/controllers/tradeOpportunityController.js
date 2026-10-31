const TradeOpportunity=require("../models/TradeOpportunity");
const HSCode=require("../models/HSCode");
const Shipment=require("../models/Shipment");

exports.getDashboard = async(req,res)=>{
    try{
    
    const dashboard=await TradeOpportunity.aggregate([
    {
    $group:{
    _id:null,
    totalOpportunities:{
    $sum:1
    },
    highPotential:{
    $sum:{
    $cond:[
    {$eq:["$growthPotential","High"]},
    1,
    0
    ]
    }
    },
    tradeValue:{
    $sum:"$tradeValue"
    },
    avgScore:{
    $avg:"$opportunityScore"
    },
    newOpportunities:{
    $sum:{
    $cond:[
    {$eq:["$status","New"]},
    1,
    0
    ]
    }
    },
    converted:{
    $sum:{
    $cond:[
    {$eq:["$status","Converted"]},
    1,
    0
    ]
    }
    }
    }
    }
    ]);
    
    res.json({
    status:1,
    data:{
    totalOpportunities:dashboard[0]?.totalOpportunities||0,
    highPotential:dashboard[0]?.highPotential||0,
    tradeValue:dashboard[0]?.tradeValue||0,
    avgScore:dashboard[0]?.avgScore||0,
    newOpportunities:dashboard[0]?.newOpportunities||0,
    converted:dashboard[0]?.converted||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getTopCountries = async(req,res)=>{
        try{
        
        const countries=await TradeOpportunity.aggregate([
        {
        $group:{
        _id:"$country",
        opportunities:{
        $sum:1
        },
        tradeValue:{
        $sum:"$tradeValue"
        },
        avgScore:{
        $avg:"$opportunityScore"
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

        exports.getDistribution = async(req,res)=>{
            try{
            
            const distribution=await TradeOpportunity.aggregate([
            {
            $group:{
            _id:"$growthPotential",
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

            exports.getScoreTrend = async(req,res)=>{
                try{
                
                const trend=await TradeOpportunity.aggregate([
                {
                $group:{
                _id:{
                $dateToString:{
                format:"%Y-%m-%d",
                date:"$createdAt"
                }
                },
                avgScore:{
                $avg:"$opportunityScore"
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

                exports.getOpportunityTypes = async(req,res)=>{
                    try{
                    
                    const types=await TradeOpportunity.aggregate([
                    {
                    $group:{
                    _id:"$opportunityType",
                    count:{
                    $sum:1
                    },
                    tradeValue:{
                    $sum:"$tradeValue"
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
                    data:types
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getTopOpportunities = async(req,res)=>{
                        try{
                        
                        const opportunities=await TradeOpportunity.find()
                        .populate("hsCode","hsCode productName")
                        .sort({
                        opportunityScore:-1
                        })
                        .limit(20);
                        
                        res.json({
                        status:1,
                        data:opportunities
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getTopHSCodes = async(req,res)=>{
                            try{
                            
                            const hsCodes=await TradeOpportunity.aggregate([
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
                            tradeValue:{
                            $sum:"$tradeValue"
                            },
                            opportunities:{
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
                            data:hsCodes
                            });
                            
                            }catch(error){
                            
                            res.status(500).json({
                            status:0,
                            message:error.message
                            });
                            
                            }
                            };

                            exports.getDemandSupplyInsights = async(req,res)=>{
                                try{
                                
                                const insight=await TradeOpportunity.aggregate([
                                {
                                $group:{
                                _id:null,
                                totalDemand:{
                                $sum:"$demandValue"
                                },
                                totalSupply:{
                                $sum:"$supplyValue"
                                },
                                totalGap:{
                                $sum:"$gapValue"
                                }
                                }
                                }
                                ]);
                                
                                res.json({
                                status:1,
                                data:insight[0]||{}
                                });
                                
                                }catch(error){
                                
                                res.status(500).json({
                                status:0,
                                message:error.message
                                });
                                
                                }
                                };

                                exports.getRecommendedActions = async(req,res)=>{
                                    try{
                                    
                                    const actions=await TradeOpportunity.find({
                                    growthPotential:"High"
                                    })
                                    .populate("hsCode","hsCode productName")
                                    .sort({
                                    opportunityScore:-1
                                    })
                                    .limit(5);
                                    
                                    res.json({
                                    status:1,
                                    data:actions
                                    });
                                    
                                    }catch(error){
                                    
                                    res.status(500).json({
                                    status:0,
                                    message:error.message
                                    });
                                    
                                    }
                                    };

                                    exports.getSavedOpportunities = async(req,res)=>{
                                        try{
                                        
                                        const opportunities=await TradeOpportunity.find({
                                        saved:true
                                        })
                                        .populate("hsCode","hsCode productName")
                                        .sort({
                                        updatedAt:-1
                                        });
                                        
                                        res.json({
                                        status:1,
                                        data:opportunities
                                        });
                                        
                                        }catch(error){
                                        
                                        res.status(500).json({
                                        status:0,
                                        message:error.message
                                        });
                                        
                                        }
                                        };

                                        exports.getFilterOptions = async(req,res)=>{
                                            try{
                                            
                                            const countries=await TradeOpportunity.distinct("country");
                                            
                                            const tradeTypes=await TradeOpportunity.distinct("tradeType");
                                            
                                            const opportunityTypes=await TradeOpportunity.distinct("opportunityType");
                                            
                                            const hsCodes=await HSCode.find({},"_id hsCode productName");
                                            
                                            res.json({
                                            status:1,
                                            data:{
                                            countries,
                                            tradeTypes,
                                            opportunityTypes,
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

                                            