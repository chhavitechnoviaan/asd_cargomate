const Buyer = require("../models/Buyer");
const Shipment = require("../models/Shipment");

exports.getDashboard = async(req,res)=>{
    try{
    
    const totalBuyers=await Buyer.countDocuments();
    
    const activeBuyers=await Buyer.countDocuments({
    status:"Active"
    });
    
    const newBuyers=await Buyer.countDocuments({
    joinedOn:{
    $gte:new Date(new Date().getFullYear(),new Date().getMonth(),1)
    }
    });
    
    const countriesCovered=await Buyer.distinct("location.country");
    
    const totalTrade=await Buyer.aggregate([
    {
    $group:{
    _id:null,
    total:{
    $sum:"$tradeVolume"
    }
    }
    }
    ]);
    
    const avgGrowth=await Buyer.aggregate([
    {
    $group:{
    _id:null,
    growth:{
    $avg:"$avgGrowth"
    }
    }
    }
    ]);
    
    res.json({
    status:1,
    data:{
    totalBuyers,
    activeBuyers,
    newBuyers,
    countriesCovered:countriesCovered.length,
    totalTradeValue:totalTrade[0]?.total||0,
    averageGrowth:avgGrowth[0]?.growth||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getBuyers = async(req,res)=>{
        try{
        
        const buyers=await Buyer.find()
        .sort({
        createdAt:-1
        });
        
        res.json({
        status:1,
        data:buyers
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };


        exports.getBuyersByCountry = async(req,res)=>{
            try{
            
            const countries=await Buyer.aggregate([
            {
            $group:{
            _id:"$location.country",
            count:{
            $sum:1
            },
            tradeValue:{
            $sum:"$tradeVolume"
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
            data:countries
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getTopBuyers = async(req,res)=>{
                try{
                
                const buyers=await Buyer.find()
                .sort({
                tradeVolume:-1
                })
                .limit(10);
                
                res.json({
                status:1,
                data:buyers
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.getPerformance = async(req,res)=>{
                    try{
                    
                    const totalBuyers=await Buyer.countDocuments();
                    
                    const averageScore=await Buyer.aggregate([
                    {
                    $group:{
                    _id:null,
                    score:{
                    $avg:"$buyerScore"
                    }
                    }
                    }
                    ]);
                    
                    const totalShipments=await Buyer.aggregate([
                    {
                    $group:{
                    _id:null,
                    shipments:{
                    $sum:"$totalShipments"
                    }
                    }
                    }
                    ]);
                    
                    const averageGrowth=await Buyer.aggregate([
                    {
                    $group:{
                    _id:null,
                    growth:{
                    $avg:"$avgGrowth"
                    }
                    }
                    }
                    ]);
                    
                    res.json({
                    status:1,
                    data:{
                    totalBuyers,
                    averageScore:averageScore[0]?.score||0,
                    totalShipments:totalShipments[0]?.shipments||0,
                    averageGrowth:averageGrowth[0]?.growth||0
                    }
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
                        
                        const products=await Buyer.aggregate([
                        {
                        $unwind:"$products"
                        },
                        {
                        $group:{
                        _id:"$products",
                        buyers:{
                        $sum:1
                        },
                        tradeValue:{
                        $sum:"$tradeVolume"
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
                        
                        
                        exports.getRecentActivity = async(req,res)=>{
                            try{
                            
                            const activities=await Buyer.find()
                            .sort({
                            lastTrade:-1
                            })
                            .limit(10);
                            
                            res.json({
                            status:1,
                            data:activities
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
                                
                                const topCountry=await Buyer.aggregate([
                                {
                                $group:{
                                _id:"$location.country",
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
                                
                                const topProduct=await Buyer.aggregate([
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
                                
                                const avgGrowth=await Buyer.aggregate([
                                {
                                $group:{
                                _id:null,
                                growth:{
                                $avg:"$avgGrowth"
                                }
                                }
                                }
                                ]);
                                
                                res.json({
                                status:1,
                                data:{
                                topCountry:topCountry[0]||{},
                                topProduct:topProduct[0]||{},
                                averageGrowth:avgGrowth[0]?.growth||0
                                }
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
                                    
                                    const countries=await Buyer.distinct("location.country");
                                    
                                    const buyerTypes=await Buyer.distinct("buyerType");
                                    
                                    const statuses=await Buyer.distinct("status");
                                    
                                    const products=await Buyer.distinct("products");
                                    
                                    res.json({
                                    status:1,
                                    data:{
                                    countries,
                                    buyerTypes,
                                    statuses,
                                    products
                                    }
                                    });
                                    
                                    }catch(error){
                                    
                                    res.status(500).json({
                                    status:0,
                                    message:error.message
                                    });
                                    
                                    }
                                    };

