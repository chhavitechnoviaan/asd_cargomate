const Shipment = require("../models/Shipment");
const ShipmentCost = require("../models/ShipmentCost");
const Vendor = require("../models/Vendor");
const Freight = require("../models/freight");
const AnalyticsInsight = require("../models/AnalyticsInsight");

exports.getDashboard = async (req, res) => {

    try{
    
    const totalShipments = await Shipment.countDocuments();
    
    const totalSpend = await ShipmentCost.aggregate([
    {
    $group:{
    _id:null,
    total:{
    $sum:"$totalCost"
    }
    }
    }
    ]);
    
    const delivered = await Shipment.countDocuments({
    status:"Delivered"
    });
    
    const total = await Shipment.countDocuments();
    
    const avgTransit = await Shipment.aggregate([
    {
    $group:{
    _id:null,
    avg:{
    $avg:"$transitDays"
    }
    }
    }
    ]);
    
    const vendors = await Vendor.countDocuments({
    status:"active"
    });
    
    res.json({
    
    status:1,
    
    data:{
    
    totalShipments,
    
    totalSpend:
    totalSpend[0]?.total || 0,
    
    onTimeDelivery:
    total
    ?
    ((delivered/total)*100).toFixed(1)
    :
    0,
    
    avgTransit:
    avgTransit[0]?.avg || 0,
    
    costPerShipment:
    total
    ?
    (
    (totalSpend[0]?.total ||0)
    /total
    ).toFixed(2)
    :
    0,
    
    activeVendors:vendors
    
    }
    
    });
    
    }catch(err){
    
    res.status(500).json({
    status:0,
    message:err.message
    })
    
    }
    
    }

    exports.shipmentOverTime = async(req,res)=>{

        try{
        
        const data=await Shipment.aggregate([
        
        {
        $group:{
        _id:{
        $dateToString:{
        format:"%d-%m",
        date:"$createdAt"
        }
        },
        count:{
        $sum:1
        }
        }
        },
        
        {
        $sort:{
        "_id":1
        }
        }
        
        ]);
        
        res.json({
        
        status:1,
        data
        
        })
        
        }catch(err){
        
        res.status(500).json({
        
        status:0,
        message:err.message
        
        })
        
        }
        
        }


        exports.shipmentMode=async(req,res)=>{

            try{
            
            const data=await Shipment.aggregate([
            
            {
            $group:{
            _id:"$route.mode",
            count:{
            $sum:1
            }
            }
            }
            
            ]);
            
            res.json({
            
            status:1,
            data
            
            })
            
            }catch(err){
            
            res.status(500).json({
            
            status:0,
            message:err.message
            
            })
            
            }
            
            }

            exports.shipmentMode=async(req,res)=>{

                try{
                
                const data=await Shipment.aggregate([
                
                {
                $group:{
                _id:"$route.mode",
                count:{
                $sum:1
                }
                }
                }
                
                ]);
                
                res.json({
                
                status:1,
                data
                
                })
                
                }catch(err){
                
                res.status(500).json({
                
                status:0,
                message:err.message
                
                })
                
                }
                
                }


                exports.topOrigins=async(req,res)=>{

                    try{
                    
                    const data=await Shipment.aggregate([
                    
                    {
                    $group:{
                    _id:"$route.origin",
                    shipments:{
                    $sum:1
                    }
                    }
                    },
                    
                    {
                    $sort:{
                    shipments:-1
                    }
                    },
                    
                    {
                    $limit:5
                    }
                    
                    ]);
                    
                    res.json({
                    
                    status:1,
                    data
                    
                    })
                    
                    }catch(err){
                    
                    res.status(500).json({
                    
                    status:0,
                    message:err.message
                    
                    })
                    
                    }
                    
                    }

                    exports.topDestinations=async(req,res)=>{

                        try{
                        
                        const data=await Shipment.aggregate([
                        
                        {
                        $group:{
                        _id:"$route.destination",
                        shipments:{
                        $sum:1
                        }
                        }
                        },
                        
                        {
                        $sort:{
                        shipments:-1
                        }
                        },
                        
                        {
                        $limit:5
                        }
                        
                        ]);
                        
                        res.json({
                        
                        status:1,
                        data
                        
                        })
                        
                        }catch(err){
                        
                        res.status(500).json({
                        
                        status:0,
                        message:err.message
                        
                        })
                        
                        }
                        
                        }


                        exports.spendByCategory = async (req, res) => {

                            try {
                        
                                const data = await ShipmentCost.aggregate([
                        
                                    {
                                        $group: {
                                            _id: "$category",
                                            total: {
                                                $sum: "$amount"
                                            }
                                        }
                                    },
                        
                                    {
                                        $sort: {
                                            total: -1
                                        }
                                    }
                        
                                ]);
                        
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

                        exports.carrierPerformance = async (req, res) => {

                            try {
                        
                                const data = await Shipment.aggregate([
                        
                                    {
                                        $group: {
                        
                                            _id: "$route.carrier",
                        
                                            shipments: {
                                                $sum: 1
                                            },
                        
                                            avgCost: {
                                                $avg: "$estimatedCost"
                                            },
                        
                                            avgTransit: {
                                                $avg: "$transitDays"
                                            },
                        
                                            delivered: {
                                                $sum: {
                                                    $cond: [
                                                        {
                                                            $eq: ["$status", "Delivered"]
                                                        },
                                                        1,
                                                        0
                                                    ]
                                                }
                                            }
                        
                                        }
                                    },
                        
                                    {
                                        $project: {
                        
                                            carrier: "$_id",
                        
                                            shipments: 1,
                        
                                            avgCost: {
                                                $round: ["$avgCost", 2]
                                            },
                        
                                            avgTransit: {
                                                $round: ["$avgTransit", 2]
                                            },
                        
                                            onTimeDelivery: {
                                                $multiply: [
                                                    {
                                                        $divide: [
                                                            "$delivered",
                                                            "$shipments"
                                                        ]
                                                    },
                                                    100
                                                ]
                                            }
                        
                                        }
                                    },
                        
                                    {
                                        $sort: {
                                            shipments: -1
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
                        
                            } catch (err) {
                        
                                res.status(500).json({
                        
                                    status: 0,
                        
                                    message: err.message
                        
                                });
                        
                            }
                        
                        };
                        
                        exports.shipmentStatusOverview = async (req, res) => {

                            try {
                        
                                const data = await Shipment.aggregate([
                        
                                    {
                                        $group: {
                        
                                            _id: "$status",
                        
                                            total: {
                                                $sum: 1
                                            }
                        
                                        }
                                    }
                        
                                ]);
                        
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


                        exports.transitTrend = async (req, res) => {

                            try {
                        
                                const data = await Shipment.aggregate([
                        
                                    {
                                        $group: {
                        
                                            _id: {
                                                $dateToString: {
                                                    format: "%d-%m",
                                                    date: "$createdAt"
                                                }
                                            },
                        
                                            avgTransit: {
                                                $avg: "$transitDays"
                                            }
                        
                                        }
                                    },
                        
                                    {
                                        $sort: {
                                            "_id": 1
                                        }
                                    }
                        
                                ]);
                        
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



                        exports.getInsights = async (req, res) => {

                            try {
                        
                                const insights = await AnalyticsInsight
                                    .find({
                                        status: "active"
                                    })
                                    .sort({
                                        priority: 1
                                    });
                        
                                res.json({
                        
                                    status: 1,
                        
                                    data: insights
                        
                                });
                        
                            } catch (err) {
                        
                                res.status(500).json({
                        
                                    status: 0,
                        
                                    message: err.message
                        
                                });
                        
                            }
                        
                        };


                        