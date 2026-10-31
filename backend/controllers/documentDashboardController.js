const ShipmentDocument = require("../models/ShipmentDocument");
const Shipment = require("../models/Shipment");

exports.getDashboard=async(req,res)=>{
    try{

    const shipments = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipments.map((shipment) => shipment._id);

    const totalDocuments=await ShipmentDocument.countDocuments({shipmentId:{ $in:shipmentIds }});
    
    const uploadedThisMonth=await ShipmentDocument.countDocuments({
    shipmentId:{ $in:shipmentIds },
    createdAt:{
    $gte:new Date(new Date().getFullYear(),new Date().getMonth(),1)
    }
    });
    
    const pendingVerification=await ShipmentDocument.countDocuments({
    shipmentId:{ $in:shipmentIds },
    status:"Pending"
    });
    
    const expiringSoon=await ShipmentDocument.countDocuments({
    shipmentId:{ $in:shipmentIds },
    expiryDate:{
    $gte:new Date(),
    $lte:new Date(Date.now()+30*24*60*60*1000)
    }
    });
    
    const verifiedDocuments=await ShipmentDocument.countDocuments({
    shipmentId:{ $in:shipmentIds },
    status:"Verified"
    });
    
    res.json({
    status:1,
    data:{
    totalDocuments,
    uploadedThisMonth,
    pendingVerification,
    expiringSoon,
    verifiedDocuments
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getDocuments=async(req,res)=>{
        try{
        const shipments = await Shipment.find({
  userId: req.user._id
}).select("_id");

const shipmentIds = shipments.map((shipment) => shipment._id);

        const documents=await ShipmentDocument.find({shipmentId:{ $in:shipmentIds }})
        .populate("shipmentId","sbNumber")
        .populate("uploadedBy","name")
        .sort({
        createdAt:-1
        });
        
        res.json({
        status:1,
        data:documents
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getDocumentsByType=async(req,res)=>{
            try{
             const shipments = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipments.map((shipment) => shipment._id);

            const types=await ShipmentDocument.aggregate([
            {
      $match:{
        shipmentId:{ $in:shipmentIds }
      }
    },
            {
            $group:{
            _id:"$documentType",
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
            data:types
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getDocumentStatusOverview=async(req,res)=>{
                try{
                const shipments = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipments.map((shipment) => shipment._id);
    
                const overview=await ShipmentDocument.aggregate([
                    {
      $match:{
        shipmentId:{ $in:shipmentIds }
      }
    },
                {
                $group:{
                _id:{
                $dateToString:{
                format:"%Y-%m-%d",
                date:"$createdAt"
                }
                },
                verified:{
                $sum:{
                $cond:[
                {$eq:["$status","Verified"]},
                1,
                0
                ]
                }
                },
                pending:{
                $sum:{
                $cond:[
                {$eq:["$status","Pending"]},
                1,
                0
                ]
                }
                },
                expired:{
                $sum:{
                $cond:[
                {$eq:["$status","Expired"]},
                1,
                0
                ]
                }
                },
                transit:{
                $sum:{
                $cond:[
                {$eq:["$status","In Transit"]},
                1,
                0
                ]
                }
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
                data:overview
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.getDocumentInsights=async(req,res)=>{
                    try{
                    const shipments = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipments.map((shipment) => shipment._id);

                    const total=await ShipmentDocument.countDocuments({shipmentId:{ $in:shipmentIds }});
                    
                    const verified=await ShipmentDocument.countDocuments({
                    shipmentId:{ $in:shipmentIds },
                    status:"Verified"
                    });
                    
                    const pending=await ShipmentDocument.countDocuments({
                    shipmentId:{ $in:shipmentIds },
                    status:"Pending"
                    });
                    
                    const expired=await ShipmentDocument.countDocuments({
                    shipmentId:{ $in:shipmentIds },
                    status:"Expired"
                    });
                    
                    const verificationRate=total
                    ?((verified/total)*100).toFixed(2)
                    :0;
                    
                    res.json({
                    status:1,
                    data:{
                    total,
                    verified,
                    pending,
                    expired,
                    verificationRate
                    }
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getExpiringDocuments=async(req,res)=>{
                        try{
                        
                        const today=new Date();
                        
                        const next30=new Date();
                        next30.setDate(today.getDate()+30);
                        
                        const documents=await ShipmentDocument.find({
                        expiryDate:{
                        $gte:today,
                        $lte:next30
                        }
                        })
                        .populate("shipmentId","sbNumber")
                        .sort({
                        expiryDate:1
                        });
                        
                        res.json({
                        status:1,
                        data:documents
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getRecentUploads=async(req,res)=>{
                            try{
                             const shipments = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipments.map((shipment) => shipment._id);

                            const uploads=await ShipmentDocument.find({shipmentId:{ $in:shipmentIds }})
                            .populate("shipmentId","sbNumber")
                            .populate("uploadedBy","name")
                            .sort({
                            createdAt:-1
                            })
                            .limit(10);
                            
                            res.json({
                            status:1,
                            data:uploads
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
                                const shipmentss = await Shipment.find({
      userId: req.user._id
    }).select("_id");

    const shipmentIds = shipmentss.map((shipment) => shipment._id);

                                const status=await ShipmentDocument.distinct("status",{shipmentId:{ $in:shipmentIds }});
                                
                                const documentTypes=await ShipmentDocument.distinct("documentType",{shipmentId:{ $in:shipmentIds }});
                                
                                const countries=await ShipmentDocument.distinct("country",{shipmentId:{ $in:shipmentIds }});
                                
                                const shipments=await Shipment.find({ _id:{ $in:shipmentIds }},{
                                _id:1,
                                sbNumber:1
                                });
                                
                                res.json({
                                status:1,
                                data:{
                                status,
                                documentTypes,
                                countries,
                                shipments
                                }
                                });
                                
                                }catch(error){
                                
                                res.status(500).json({
                                status:0,
                                message:error.message
                                });
                                
                                }
                                };

                                