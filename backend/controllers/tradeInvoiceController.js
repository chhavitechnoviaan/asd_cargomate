const TradeInvoice = require("../models/TradeInvoice");

exports.getDashboard = async (req,res)=>{
    try{
    
    const totalInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id});
    
    const paidInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
    status:"Paid"
    });
    
    const pendingInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
    status:"Pending"
    });
    
    const overdueInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
    status:"Overdue"
    });
    
    const invoiceStats=await TradeInvoice.aggregate([
    {
$match:{
createdBy:req.user._id
}
},
    {
    $group:{
    _id:null,
    totalValue:{$sum:"$invoiceValue"},
    averageValue:{$avg:"$invoiceValue"}
    }
    }
    ]);
    
    res.json({
    status:1,
    data:{
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    overdueInvoices,
    totalInvoiceValue:invoiceStats[0]?.totalValue||0,
    averageInvoiceValue:invoiceStats[0]?.averageValue||0
    }
    });
    
    }catch(error){
    
    res.status(500).json({
    status:0,
    message:error.message
    });
    
    }
    };

    exports.getInvoices=async(req,res)=>{
        try{
        
        const {search,status,type,country}=req.query;
        
        let filter={createdBy:req.user._id};
        
        if(search){
        
        filter.$or=[
        {
        invoiceNumber:{
        $regex:search,
        $options:"i"
        }
        },
        {
        party:{
        $regex:search,
        $options:"i"
        }
        }
        ];
        
        }
        
        if(status) filter.status=status;
        
        if(type) filter.type=type;
        
        if(country) filter.country=country;
        
        const invoices=await TradeInvoice.find(filter)
        .sort({
        createdAt:-1
        });
        
        res.json({
        status:1,
        data:invoices
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getStatusSummary=async(req,res)=>{
            try{
            
            const data=await TradeInvoice.aggregate([
            {
$match:{
createdBy:req.user._id
}
},
            {
            $group:{
            _id:"$status",
            count:{
            $sum:1
            }
            }
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

            exports.getValueTrend=async(req,res)=>{
                try{
                
                const trend=await TradeInvoice.aggregate([
                {
$match:{
createdBy:req.user._id
}
},
                {
                $group:{
                _id:{
                month:{
                $month:"$invoiceDate"
                }
                },
                value:{
                $sum:"$invoiceValue"
                }
                }
                },
                {
                $sort:{
                "_id.month":1
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

                exports.getRecentInvoices=async(req,res)=>{
                    try{
                    
                    const invoices=await TradeInvoice.find({createdBy:req.user._id})
                    .sort({
                    invoiceDate:-1
                    })
                    .limit(10);
                    
                    res.json({
                    status:1,
                    data:invoices
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };

                    exports.getTopParties=async(req,res)=>{
                        try{
                        
                        const parties=await TradeInvoice.aggregate([
                            {
$match:{
createdBy:req.user._id
}
},
                        {
                        $group:{
                        _id:"$party",
                        total:{
                        $sum:"$invoiceValue"
                        }
                        }
                        },
                        {
                        $sort:{
                        total:-1
                        }
                        },
                        {
                        $limit:5
                        }
                        ]);
                        
                        res.json({
                        status:1,
                        data:parties
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.getOverdueInvoices=async(req,res)=>{
                            try{
                            
                            const invoices=await TradeInvoice.find({
                            createdBy:req.user._id,
                            status:"Overdue"
                            })
                            .sort({
                            dueDate:1
                            });
                            
                            res.json({
                            status:1,
                            data:invoices
                            });
                            
                            }catch(error){
                            
                            res.status(500).json({
                            status:0,
                            message:error.message
                            });
                            
                            }
                            };

                            exports.getInsights=async(req,res)=>{
                                try{
                                
                                const paid=await TradeInvoice.countDocuments({
                                createdBy:req.user._id,
                                status:"Paid"
                                });
                                
                                const overdue=await TradeInvoice.countDocuments({
                                createdBy:req.user._id,
                                status:"Overdue"
                                });
                                
                                const pendingAmount=await TradeInvoice.aggregate([
                                {
                                $match:{
                                createdBy:req.user._id,
                                status:"Pending"
                                }
                                },
                                {
                                $group:{
                                _id:null,
                                amount:{
                                $sum:"$invoiceValue"
                                }
                                }
                                }
                                ]);
                                
                                res.json({
                                status:1,
                                data:{
                                paidInvoices:paid,
                                overdueInvoices:overdue,
                                pendingAmount:pendingAmount[0]?.amount||0
                                }
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
                                    
                                    const countries=await TradeInvoice.distinct("country",{createdBy:req.user._id});
                                    
                                    const types=await TradeInvoice.distinct("type",{createdBy:req.user._id});
                                    
                                    const statuses=await TradeInvoice.distinct("status",{createdBy:req.user._id});
                                    
                                    res.json({
                                    status:1,
                                    data:{
                                    countries,
                                    types,
                                    statuses
                                    }
                                    });
                                    
                                    }catch(error){
                                    
                                    res.status(500).json({
                                    status:0,
                                    message:error.message
                                    });
                                    
                                    }
                                    };

                                    