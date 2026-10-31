const Shipment=require("../models/Shipment");
const HSCode=require("../models/HSCode");
const Competitor=require("../models/Competitor");

exports.getDashboard = async(req,res)=>{
    try{
    
    const dashboard=await Competitor.aggregate([
    {
    $group:{
    _id:null,
    competitors:{
    $sum:1
    },
    shipments:{
    $sum:"$totalShipments"
    },
    tradeValue:{
    $sum:"$totalTradeValue"
    },
    marketShare:{
    $avg:"$marketShare"
    },
    products:{
    $sum:{
    $size:"$products"
    }
    }
    }
    }
    ]);
    
    const countries=await Competitor.distinct("country");
    
    const newCompetitors=await Competitor.countDocuments({
    createdAt:{
    $gte:new Date(new Date().setMonth(new Date().getMonth()-1))
    }
    });
    
    res.json({
    status:1,
    data:{
    totalCompetitors:dashboard[0]?.competitors||0,
    totalShipments:dashboard[0]?.shipments||0,
    totalTradeValue:dashboard[0]?.tradeValue||0,
    marketsCovered:countries.length,
    productsHandled:dashboard[0]?.products||0,
    newCompetitors,
    marketShare:dashboard[0]?.marketShare||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

 exports.getTradeComparison = async(req,res)=>{
        try{
        
        const competitors=await Competitor.find()
        .sort({
        totalTradeValue:-1
        })
        .limit(10);
        
        res.json({
        status:1,
        data:competitors
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getMarketShare = async(req,res)=>{
            try{
            
            const marketShare=await Competitor.aggregate([
            {
            $project:{
            companyName:1,
            marketShare:1
            }
            },
            {
            $sort:{
            marketShare:-1
            }
            }
            ]);
            
            res.json({
            status:1,
            data:marketShare
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };
            
            exports.getTradeTrend = async(req,res)=>{
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

                exports.getTopCompetitors = async(req,res)=>{
                    try{
                    
                    const competitors=await Competitor.find()
                    .sort({
                    totalShipments:-1
                    })
                    .limit(10);
                    
                    res.json({
                    status:1,
                    data:competitors
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getTopProducts = async(req,res)=>{
                        try{
                        
                        const products=await Competitor.aggregate([
                        {
                        $unwind:"$products"
                        },
                        {
                        $group:{
                        _id:"$products",
                        description:{
                            $first:"$products.description"
                        },
                        competitors:{
                         $first:"$companyName"
                        },
                        tradeValue:{
                        $sum:"$totalTradeValue"
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

                        exports.getCountryPresence = async(req,res)=>{
                            try{
                            
                            const countries=await Competitor.aggregate([
                            {
                            $group:{
                            _id:"$country",
                            competitors:{
                            $sum:1
                            },
                            tradeValue:{
                            $sum:"$totalTradeValue"
                            }
                            }
                            },
                            {
                            $sort:{
                            competitors:-1
                            }
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

                            exports.getActivitySnapshot = async(req,res)=>{
                                try{
                                
                                const competitors=await Competitor.find()
                                .sort({
                                totalTradeValue:-1
                                })
                                .limit(20);
                                
                                res.json({
                                status:1,
                                data:competitors
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
                                    
                                    const competitors=await Competitor.find({},{
                                    companyName:1
                                    });
                                    
                                    const countries=await Competitor.distinct("country");
                                    
                                    const products=await Competitor.distinct("products");
                                    
                                    const tradeTypes=[
                                    "Import",
                                    "Export"
                                    ];
                                    
                                    const periods=[
                                    "Today",
                                    "This Week",
                                    "This Month",
                                    "This Quarter",
                                    "This Year"
                                    ];
                                    
                                    res.json({
                                    status:1,
                                    data:{
                                    competitors,
                                    countries,
                                    products,
                                    tradeTypes,
                                    periods
                                    }
                                    });
                                    
                                    }catch(error){
                                    
                                    res.status(500).json({
                                    status:0,
                                    message:error.message
                                    });
                                    
                                    }
                                    };

                                    exports.getCompetitorDetails = async(req,res)=>{
                                        try{
                                        
                                        const{id}=req.params;
                                        
                                        const competitor=await Competitor.findById(id);
                                        
                                        if(!competitor){
                                        
                                        return res.status(404).json({
                                        status:0,
                                        message:"Competitor not found"
                                        });
                                        
                                        }
                                        
                                        res.json({
                                        status:1,
                                        data:competitor
                                        });
                                        
                                        }catch(error){
                                        
                                        res.status(500).json({
                                        status:0,
                                        message:error.message
                                        });
                                        
                                        }
                                        };

                                        exports.getInsights = async(req,res)=>{
                                            try{
                                            
                                            const topCompetitor=await Competitor.findOne()
                                            .sort({
                                            marketShare:-1
                                            });
                                            
                                            const fastestGrowing=await Competitor.findOne()
                                            .sort({
                                            growth:-1
                                            });
                                            
                                            const topProduct=await Competitor.aggregate([
                                            {
                                            $unwind:"$products"
                                            },
                                            {
                                            $group:{
                                            _id:"$products",
                                            count:{
                                            $sum:1
                                            }
                                            }
                                            },
                                            {
                                            $sort:{
                                            count:-1
                                            }
                                            },
                                            {
                                            $limit:1
                                            }
                                            ]);
                                            
                                            const insights=[
                                            
                                            `${topCompetitor?.companyName||"-"} has the highest market share.`,
                                            
                                            `${fastestGrowing?.companyName||"-"} is the fastest growing competitor.`,
                                            
                                            `Most handled product is ${topProduct[0]?._id||"-"}.`
                                            
                                            ];
                                            
                                            res.json({
                                            status:1,
                                            data:insights
                                            });
                                            
                                            }catch(error){
                                            
                                            res.status(500).json({
                                            status:0,
                                            message:error.message
                                            });
                                            
                                            }
                                            };

                                            


