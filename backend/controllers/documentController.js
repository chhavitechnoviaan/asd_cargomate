const ShipmentDocument = require("../models/ShipmentDocument");
const Shipment = require("../models/Shipment");
const Activity = require("../models/Activity");
const fs = require("fs");
const path = require("path");


exports.uploadDocument = async (req, res) => {

    try {

        const {

            shipmentId,

            documentName,

            documentType,

            expiryDate,

            remarks

        } = req.body;

        if (!req.file) {

            return res.status(400).json({

                status:0,

                message:"Please upload file"

            });

        }

        const document = await ShipmentDocument.create({

            shipmentId,

            documentName,

            documentType,

            expiryDate,

            remarks,

            uploadedBy:req.user._id,

            fileUrl:req.file.path,

            fileName:req.file.originalname,

            fileSize:req.file.size,

            status:"Uploaded"

        });

        await Activity.create({

            shipmentId,

            userId:req.user._id,

            type:"DOCUMENT",

            message:`${documentName} uploaded`

        });

        res.json({

            status:1,

            message:"Document uploaded successfully",

            data:document

        });

    }

    catch(err){

        res.status(500).json({

            status:0,

            message:err.message

        });

    }

};exports.getDocuments = async(req,res)=>{

    try{
    
    const {
    
    search,
    
    status,
    
    shipmentId,
    
    page=1,
    
    limit=10
    
    }=req.query;
    
    let query={};
    
    if(shipmentId)
    query.shipmentId=shipmentId;
    
    if(status)
    query.status=status;
    
    if(search){
    
    query.documentName={
    
    $regex:search,
    
    $options:"i"
    
    };
    
    }
    
    const documents=await ShipmentDocument.find(query)
    
    .populate("shipmentId","sbNumber")
    
    .populate("uploadedBy","name")
    
    .sort({
    
    createdAt:-1
    
    })
    
    .skip((page-1)*limit)
    
    .limit(Number(limit));
    
    const total=await ShipmentDocument.countDocuments(query);
    
    res.json({
    
    status:1,
    
    data:documents,
    
    pagination:{
    
    total,
    
    page:Number(page),
    
    pages:Math.ceil(total/limit)
    
    }
    
    });
    
    }
    
    catch(err){
    
    res.status(500).json({
    
    status:0,
    
    message:err.message
    
    });
    
    }
    
    };

    exports.getDashboard=async(req,res)=>{

        try{
        
        const totalDocuments=
        
        await ShipmentDocument.countDocuments();
        
        const required=
        
        await ShipmentDocument.countDocuments({
        
        documentType:"Required"
        
        });
        
        const applicable=
        
        await ShipmentDocument.countDocuments({
        
        documentType:"If Applicable"
        
        });
        
        const notRequired=
        
        await ShipmentDocument.countDocuments({
        
        documentType:"Not Required"
        
        });
        
        const uploadedThisMonth=
        
        await ShipmentDocument.countDocuments({
        
        createdAt:{
        
        $gte:new Date(
        
        new Date().getFullYear(),
        
        new Date().getMonth(),
        
        1
        
        )
        
        }
        
        });
        
        const expiringSoon=
        
        await ShipmentDocument.countDocuments({
        
        expiryDate:{
        
        $lte:new Date(
        
        Date.now()+15*24*60*60*1000
        
        )
        
        }
        
        });
        
        res.json({
        
        status:1,
        
        data:{
        
        totalDocuments,
        
        required,
        
        applicable,
        
        notRequired,
        
        uploadedThisMonth,
        
        expiringSoon
        
        }
        
        });
        
        }
        
        catch(err){
        
        res.status(500).json({
        
        status:0,
        
        message:err.message
        
        });
        
        }
        
        };


        exports.getRecentUploads=async(req,res)=>{

            try{
            
            const data=
            
            await ShipmentDocument.find()
            
            .sort({
            
            createdAt:-1
            
            })
            
            .limit(5);
            
            res.json({
            
            status:1,
            
            data
            
            });
            
            }
            
            catch(err){
            
            res.status(500).json({
            
            status:0,
            
            message:err.message
            
            });
            
            }
            
            };

            exports.getStorage=async(req,res)=>{

                try{
                
                const docs=
                
                await ShipmentDocument.find();
                
                let totalStorage=0;
                
                docs.forEach(doc=>{
                
                totalStorage+=doc.fileSize||0;
                
                });
                
                res.json({
                
                status:1,
                
                data:{
                
                documents:docs.length,
                
                totalStorage
                
                }
                
                });
                
                }
                
                catch(err){
                
                res.status(500).json({
                
                status:0,
                
                message:err.message
                
                });
                
                }
                
                };

                exports.getExpiringDocuments=async(req,res)=>{

                    try{
                    
                    const data=
                    
                    await ShipmentDocument.find({
                    
                    expiryDate:{
                    
                    $lte:new Date(
                    
                    Date.now()+15*24*60*60*1000
                    
                    )
                    
                    }
                    
                    });
                    
                    res.json({
                    
                    status:1,
                    
                    data
                    
                    });
                    
                    }
                    
                    catch(err){
                    
                    res.status(500).json({
                    
                    status:0,
                    
                    message:err.message
                    
                    });
                    
                    }
                    
                    };

                    exports.downloadDocument=async(req,res)=>{

                        try{
                        
                        const document=
                        
                        await ShipmentDocument.findById(req.params.id);
                        
                        if(!document){
                        
                        return res.status(404).json({
                        
                        status:0,
                        
                        message:"Document not found"
                        
                        });
                        
                        }
                        
                        res.download(
                        
                        path.resolve(document.fileUrl),
                        
                        document.fileName
                        
                        );
                        
                        }
                        
                        catch(err){
                        
                        res.status(500).json({
                        
                        status:0,
                        
                        message:err.message
                        
                        });
                        
                        }
                        
                        };

                        exports.deleteDocument=async(req,res)=>{

                            try{
                            
                            const document=
                            
                            await ShipmentDocument.findById(req.params.id);
                            
                            if(!document){
                            
                            return res.status(404).json({
                            
                            status:0,
                            
                            message:"Document not found"
                            
                            });
                            
                            }
                            
                            if(fs.existsSync(document.fileUrl)){
                            
                            fs.unlinkSync(document.fileUrl);
                            
                            }
                            
                            await ShipmentDocument.findByIdAndDelete(req.params.id);
                            
                            res.json({
                            
                            status:1,
                            
                            message:"Document deleted"
                            
                            });
                            
                            }
                            
                            catch(err){
                            
                            res.status(500).json({
                            
                            status:0,
                            
                            message:err.message
                            
                            });
                            
                            }
                            
                            };