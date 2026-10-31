const Supplier = require("../models/Supplier");
const Shipment = require("../models/Shipment");

exports.getSuppliers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await Supplier.countDocuments();

        const suppliers = await Supplier.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            status: 1,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: suppliers
        });

    } catch (error) {

        res.status(500).json({
            status: 0,
            message: error.message
        });

    }

};

    exports.getSuppliersByCountry = async(req,res)=>{
        try{
        
        const countries=await Supplier.aggregate([
        {
        $group:{
        _id:"$country",
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
        data:countries
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getTopSuppliers = async(req,res)=>{
            try{
            
            const suppliers=await Supplier.find()
            .sort({
            totalTradeValue:-1
            })
            .limit(5);
            
            res.json({
            status:1,
            data:suppliers
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getSupplierPerformance = async(req,res)=>{
                try{
                
                const totalSuppliers=await Supplier.countDocuments();
                
                const averageScore=await Supplier.aggregate([
                {
                $group:{
                _id:null,
                score:{
                $avg:"$qualityScore"
                }
                }
                }
                ]);
                
                const activeSuppliers=await Supplier.countDocuments({
                status:"Active"
                });
                
                const pendingSuppliers=await Supplier.countDocuments({
                status:"Pending"
                });
                
                res.json({
                status:1,
                data:{
                totalSuppliers,
                averageScore:averageScore[0]?.score||0,
                activeSuppliers,
                pendingSuppliers
                }
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.getVerificationStatus = async(req,res)=>{
                    try{
                    
                    const verified=await Supplier.countDocuments({
                    isVerified:true
                    });
                    
                    const pending=await Supplier.countDocuments({
                    status:"Pending"
                    });
                    
                    const rejected=await Supplier.countDocuments({
                    status:"Rejected"
                    });
                    
                    const expired=await Supplier.countDocuments({
                    status:"Expired"
                    });
                    
                    res.json({
                    status:1,
                    data:{
                    verified,
                    pending,
                    rejected,
                    expired
                    }
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };
                    exports.getNewSuppliers = async(req,res)=>{
                        try{
                        
                        const suppliers=await Supplier.find()
                        .sort({
                        joinedOn:-1
                        })
                        .limit(10);
                        
                        res.json({
                        status:1,
                        data:suppliers
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getSupplierInsights = async(req,res)=>{
                            try{
                            
                            const topCategory=await Supplier.aggregate([
                            {
                            $group:{
                            _id:"$category",
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
                            
                            const topCountry=await Supplier.aggregate([
                            {
                            $group:{
                            _id:"$country",
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
                            
                            const avgScore=await Supplier.aggregate([
                            {
                            $group:{
                            _id:null,
                            score:{
                            $avg:"$qualityScore"
                            }
                            }
                            }
                            ]);
                            
                            res.json({
                            status:1,
                            data:{
                            topCategory:topCategory[0]||{},
                            topCountry:topCountry[0]||{},
                            averageScore:avgScore[0]?.score||0
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
                                
                                const countries=await Supplier.distinct("country");
                                
                                const supplierTypes=await Supplier.distinct("supplierType");
                                
                                const categories=await Supplier.distinct("category");
                                
                                const statuses=await Supplier.distinct("status");
                                
                                const products=await Supplier.distinct("products");
                                
                                res.json({
                                status:1,
                                data:{
                                countries,
                                supplierTypes,
                                categories,
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