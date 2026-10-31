const Shipment = require("../models/Shipment");
const ShipmentAlert = require("../models/ShipmentAlert");

exports.getDashboard=async(req,res)=>{
    try{
    const userId = req.user._id;
    const totalShipments=await Shipment.countDocuments({userId});
    
    const inTransit=await Shipment.countDocuments({userId,
    shipmentStatus:"In Transit"
    });
    
    const delivered=await Shipment.countDocuments({userId,
    shipmentStatus:"Submitted"
    });
    
    const pending = await Shipment.countDocuments({userId,
      approvalStatus: "Pending"
    });

    const delayed=await Shipment.countDocuments({userId,
    exceptionStatus:"Delayed"
    });
    
    const exception=await Shipment.countDocuments({userId,
    exceptionStatus:{ $ne: "None" }
    });
    
    const shipmentValue=await Shipment.aggregate([
     {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$cargo.value"
          }
        }
      }
    ]);
    
    res.json({
    status:1,
    data:{
    totalShipments,
    inTransit,
    delivered,
    pending,
    delayed,
    exception,
    shipmentValue:shipmentValue[0]?.total||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getShipments=async(req,res)=>{
        try{
        
        const shipments=await Shipment.find({userId: req.user._id})
        .populate("cargo.hsCode","hsCode productName")
        .sort({
        shipmentDate:-1
        });
        
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

        exports.getShipmentTracker=async(req,res)=>{
            try{
            const userId = req.user._id;
            const shipment=await Shipment.findOne({
      _id: req.params.id,
      userId
    })
            .populate("cargo.hsCode","hsCode productName");
            
            res.json({
            status:1,
            data:shipment
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getShipmentStatusOverview=async(req,res)=>{
                try{
                const userId = req.user._id;
                const overview=await Shipment.aggregate([
                {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: "$shipmentStatus",
          count: {
            $sum: 1
          }
        }
      }
    ]);
                
                res.json({
                status:1,
                data:overview
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.getShipmentsByMode=async(req,res)=>{
                    try{
                    const userId = req.user._id;
                    const modes=await Shipment.aggregate([
                    {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: "$route.mode",
          count: {
            $sum: 1
          },
          value: {
            $sum: "$cargo.value"
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
                    status:1,
                    data:modes
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getTopOriginCountries=async(req,res)=>{
                        try{
                        
                        const countries=await Shipment.aggregate([
                        {
                        $group:{
                        _id:"$route.origin",
                        shipments:{
                        $sum:1
                        },
                        tradeValue:{
                        $sum:"$cargo.value"
                        }
                        }
                        },
                        {
                        $sort:{
                        shipments:-1
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

                        exports.getRecentAlerts=async(req,res)=>{
                            try{
                            
                            const alerts=await ShipmentAlert.find()
                            .populate("shipment","sbNumber status")
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

                            exports.getTopDestinationCountries=async(req,res)=>{
                                try{
                                
                                const countries=await Shipment.aggregate([
                                {
                                $group:{
                                _id:"$route.destination",
                                shipments:{
                                $sum:1
                                },
                                tradeValue:{
                                $sum:"$cargo.value"
                                }
                                }
                                },
                                {
                                $sort:{
                                shipments:-1
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

                                exports.getFilterOptions=async(req,res)=>{
                                    try{
                                    const userId = req.user._id;
                                     const userShipments = await Shipment.find({
      userId
    });

    const status = [
      ...new Set(
        userShipments
          .map(item => item.shipmentStatus)
          .filter(Boolean)
      )
    ];

    const modes = [
      ...new Set(
        userShipments
          .map(item => item.route?.mode)
          .filter(Boolean)
      )
    ];

    const origins = [
      ...new Set(
        userShipments
          .map(item => item.route?.originCountry)
          .filter(Boolean)
      )
    ];

    const destinations = [
      ...new Set(
        userShipments
          .map(item => item.route?.destinationCountry)
          .filter(Boolean)
      )
    ];

    const hsCodes = [
      ...new Set(
        userShipments
          .map(item => item.cargo?.productName)
          .filter(Boolean)
      )
    ];

                                    
                                    res.json({
                                    status:1,
                                    data:{
                                    status,
                                    modes,
                                    origins,
                                    destinations,
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