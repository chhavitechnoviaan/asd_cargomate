const Shipment = require("../models/Shipment");
const HSCode = require("../models/HSCode");
const TradeRoute = require("../models/TradeRoute");

exports.getDashboard = async(req,res)=>{
    try{
    
    const dashboard=await TradeRoute.aggregate([
    {
    $group:{
    _id:null,
    tradeValue:{$sum:"$tradeValue"},
    shipments:{$sum:"$shipments"},
    exportValue:{
    $sum:{
    $cond:[
    {$eq:["$tradeType","Export"]},
    "$tradeValue",
    0
    ]
    }
    },
    importValue:{
    $sum:{
    $cond:[
    {$eq:["$tradeType","Import"]},
    "$tradeValue",
    0
    ]
    }
    }
    }
    }
    ]);
    
    const growingHS=await HSCode.countDocuments({status:"active"});
    const decliningHS=await HSCode.countDocuments({status:"inactive"});
    const countries=await TradeRoute.distinct("toCountry");
    
    res.json({
    status:1,
    data:{
    tradeValue:dashboard[0]?.tradeValue||0,
    shipments:dashboard[0]?.shipments||0,
    growingHSCodes:growingHS,
    decliningHSCodes:decliningHS,
    newMarkets:countries.length,
    highGrowthProducts:growingHS,
    exportValue:dashboard[0]?.exportValue||0,
    importValue:dashboard[0]?.importValue||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
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

        exports.getTradeValueByType = async (req, res) => {
        try {

        const data = await TradeRoute.aggregate([
            {
                $group: {
                    _id: "$tradeType",
                    tradeValue: {
                        $sum: "$tradeValue"
                    }
                }
            },
            {
                $sort: {
                    tradeValue: -1
                }
            }
        ]);

        const totalTradeValue = data.reduce(
            (sum, item) => sum + item.tradeValue,
            0
        );

        const result = data.map((item) => ({
            tradeType: item._id,
            tradeValue: item.tradeValue,
            percentage: totalTradeValue
                ? ((item.tradeValue / totalTradeValue) * 100).toFixed(1)
                : "0"
        }));

        return res.status(200).json({
            status: 1,
            message: "Trade value by type fetched successfully",
            data: result,
            totalTradeValue
        });

    } catch (error) {

        return res.status(500).json({
            status: 0,
            message: error.message
        });

    }
};

        exports.getMarketSummary=async(req,res)=>{
            try{
            
            const topCategory=await TradeRoute.findOne().sort({growth:-1});
            
            const topCountry=await TradeRoute.findOne().sort({tradeValue:-1});
            
            const topHS=await HSCode.findOne({status:"active"});
            
            res.json({
            status:1,
            data:{
            topCategory,
            topCountry,
            topHS
            }
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getTopCategories=async(req,res)=>{
                try{
                
                const data=await TradeRoute.aggregate([
                {
                $group:{
                _id:"$topProduct",
                tradeValue:{
                $sum:"$tradeValue"
                },
                growth:{
                $avg:"$growth"
                }
                }
                },
                {
                $sort:{
                growth:-1
                }
                },
                {
                $limit:10
                }
                ]);
                
                res.json({
                status:1,
                data
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.getGrowingCountries = async(req,res)=>{
                    try{
                    
                    const countries=await TradeRoute.aggregate([
                    {
                    $group:{
                    _id:"$toCountry",
                    tradeValue:{
                    $sum:"$tradeValue"
                    },
                    growth:{
                    $avg:"$growth"
                    }
                    }
                    },
                    {
                    $sort:{
                    growth:-1
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

                    exports.getDecliningCountries = async(req,res)=>{
                        try{
                        
                        const countries=await TradeRoute.aggregate([
                        {
                        $group:{
                        _id:"$toCountry",
                        tradeValue:{
                        $sum:"$tradeValue"
                        },
                        growth:{
                        $avg:"$growth"
                        }
                        }
                        },
                        {
                        $sort:{
                        growth:1
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

                        exports.getRisingHSCodes = async(req,res)=>{
                            try{
                            
                            const hsCodes=await TradeRoute.aggregate([
                            {
                            $lookup:{
                            from:"hscodes",
                            localField:"hsCode",
                            foreignField:"_id",
                            as:"hsCode"
                            }
                            },
                            {
                            $unwind:"$hsCode"
                            },
                            {
                            $group:{
                            _id:"$hsCode.hsCode",
                            description:{
                            $first:"$hsCode.description"
                            },
                            tradeValue:{
                            $sum:"$tradeValue"
                            },
                            growth:{
                            $avg:"$growth"
                            }
                            }
                            },
                            {
                            $sort:{
                            growth:-1
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

                            exports.getDecliningHSCodes = async(req,res)=>{
                                try{
                                
                                const hsCodes=await TradeRoute.aggregate([
                                {
                                $lookup:{
                                from:"hscodes",
                                localField:"hsCode",
                                foreignField:"_id",
                                as:"hsCode"
                                }
                                },
                                {
                                $unwind:"$hsCode"
                                },
                                {
                                $group:{
                                _id:"$hsCode.hsCode",
                                description:{
                                $first:"$hsCode.description"
                                },
                                tradeValue:{
                                $sum:"$tradeValue"
                                },
                                growth:{
                                $avg:"$growth"
                                }
                                }
                                },
                                {
                                $sort:{
                                growth:1
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


                                exports.getInsights = async(req,res)=>{
                                    try{
                                    
                                    const totalTrade=await TradeRoute.aggregate([
                                    {
                                    $group:{
                                    _id:null,
                                    tradeValue:{
                                    $sum:"$tradeValue"
                                    },
                                    growth:{
                                    $avg:"$growth"
                                    }
                                    }
                                    }
                                    ]);
                                    
                                    const topCategory=await TradeRoute.findOne().sort({growth:-1});
                                    
                                    const topCountry=await TradeRoute.findOne().sort({tradeValue:-1});
                                    
                                    const topHS=await HSCode.findOne({status:"active"});
                                    
                                    const insights=[
                                    `Global trade value increased by ${totalTrade[0]?.growth?.toFixed(2)||0}% compared to last month.`,
                                    `${topCategory?.topProduct||"N/A"} is the fastest growing product category.`,
                                    `${topCountry?.toCountry||"N/A"} is currently the strongest growing market.`,
                                    `HS Code ${topHS?.hsCode||"-"} is showing strong market momentum.`
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


                                    exports.getGrowthOpportunities = async(req,res)=>{
                                        try{
                                        
                                        const opportunities=await TradeRoute.find()
                                        .populate("hsCode","hsCode description")
                                        .sort({growth:-1})
                                        .limit(10);
                                        
                                        const result = opportunities.map((item) => ({
                                            ...item.toObject(),
                                            score: Math.min(100, Math.max(0, item.growth || 0))
                                        }));

                                        res.json({
                                        status:1,
                                        data: result
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
                                            
                                            const tradeTypes=await TradeRoute.distinct("tradeType");
                                            
                                            const countries=await TradeRoute.distinct("toCountry");
                                            
                                            const products=await TradeRoute.distinct("topProduct");
                                            
                                            const hsCodes=await HSCode.find({},"_id hsCode description");
                                            
                                            const periods=[
                                            "Today",
                                            "This Week",
                                            "This Month",
                                            "This Quarter",
                                            "This Year"
                                            ];
                                            
                                            const compareWith=[
                                            "Previous Day",
                                            "Last Week",
                                            "Last Month",
                                            "Last Quarter",
                                            "Last Year"
                                            ];
                                            
                                            res.json({
                                            status:1,
                                            data:{
                                            tradeTypes,
                                            countries,
                                            products,
                                            hsCodes,
                                            periods,
                                            compareWith
                                            }
                                            });
                                            
                                            }catch(error){
                                            
                                            res.status(500).json({
                                            status:0,
                                            message:error.message
                                            });
                                            
                                            }
                                            };