const Alert = require("../models/Alert");
const Notification = require("../models/Notification");

exports.getDashboard = async (req, res) => {
    try {
  
      const totalAlerts = await Alert.countDocuments();
  
      const critical = await Alert.countDocuments({
        severity: "Critical"
      });
  
      const warning = await Alert.countDocuments({
        severity: "Warning"
      });
  
      const info = await Alert.countDocuments({
        severity: "Info"
      });
  
      const totalNotifications = await Notification.countDocuments({
        userId: req.user._id
      });
  
      const unread = await Notification.countDocuments({
        userId: req.user._id,
        isRead: false
      });
  
      const read = await Notification.countDocuments({
        userId: req.user._id,
        isRead: true
      });
  
      res.json({
        status:1,
        data:{
          alerts:{
            totalAlerts,
            critical,
            warning,
            info
          },
          notifications:{
            totalNotifications,
            unread,
            read
          }
        }
      });
  
    } catch(error){
  
      res.status(500).json({
        status:0,
        message:error.message
      });
  
    }
  };

  exports.getAlerts = async(req,res)=>{
    try{
    
    const alerts=await Alert.find()
    .sort({createdAt:-1});
    
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

    exports.getNotifications=async(req,res)=>{
        try{
        
        const notifications=await Notification.find({
        userId:req.user._id
        })
        .sort({
        createdAt:-1
        });
        
        res.json({
        status:1,
        data:notifications
        });
        
        }catch(error){
        
        res.status(500).json({
        status:0,
        message:error.message
        });
        
        }
        };

        exports.getAlertFilters=async(req,res)=>{
            try{
            
            const categories=await Alert.distinct("category");
            
            const severity=await Alert.distinct("severity");
            
            const status=await Alert.distinct("status");
            
            res.json({
            status:1,
            data:{
            categories,
            severity,
            status
            }
            });
            
            }catch(error){
            
            res.status(500).json({
            status:0,
            message:error.message
            });
            
            }
            };

            exports.getNotificationFilters=async(req,res)=>{
                try{
                
                const category=await Notification.distinct("category");
                
                const urgency=await Notification.distinct("urgency");
                
                res.json({
                status:1,
                data:{
                category,
                urgency
                }
                });
                
                }catch(error){
                
                res.status(500).json({
                status:0,
                message:error.message
                });
                
                }
                };

                exports.markNotificationRead=async(req,res)=>{
                    try{
                    
                    const notification=await Notification.findByIdAndUpdate(
                    
                    req.params.id,
                    
                    {
                    isRead:true
                    },
                    
                    {
                    new:true
                    }
                    
                    );
                    
                    res.json({
                    status:1,
                    data:notification
                    });
                    
                    }catch(error){
                    
                    res.status(500).json({
                    status:0,
                    message:error.message
                    });
                    
                    }
                    };


                    exports.markAllNotificationsRead=async(req,res)=>{
                        try{
                        
                        await Notification.updateMany(
                        
                        {
                        userId:req.user._id,
                        isRead:false
                        },
                        
                        {
                        isRead:true
                        }
                        
                        );
                        
                        res.json({
                        status:1,
                        message:"All notifications marked as read"
                        });
                        
                        }catch(error){
                        
                        res.status(500).json({
                        status:0,
                        message:error.message
                        });
                        
                        }
                        };

                        exports.resolveAlert=async(req,res)=>{
                            try{
                            
                            const alert=await Alert.findByIdAndUpdate(
                            
                            req.params.id,
                            
                            {
                            status:"Resolved"
                            },
                            
                            {
                            new:true
                            }
                            
                            );
                            
                            res.json({
                            status:1,
                            data:alert
                            });
                            
                            }catch(error){
                            
                            res.status(500).json({
                            status:0,
                            message:error.message
                            });
                            
                            }
                            };

                            exports.deleteAlert=async(req,res)=>{
                                try{
                                
                                await Alert.findByIdAndDelete(req.params.id);
                                
                                res.json({
                                status:1,
                                message:"Alert deleted successfully"
                                });
                                
                                }catch(error){
                                
                                res.status(500).json({
                                status:0,
                                message:error.message
                                });
                                
                                }
                                };

                                exports.deleteNotification=async(req,res)=>{
                                    try{
                                    
                                    await Notification.findByIdAndDelete(req.params.id);
                                    
                                    res.json({
                                    status:1,
                                    message:"Notification deleted successfully"
                                    });
                                    
                                    }catch(error){
                                    
                                    res.status(500).json({
                                    status:0,
                                    message:error.message
                                    });
                                    
                                    }
                                    };

                                    