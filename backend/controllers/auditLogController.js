const AuditLog = require("../models/AuditLog");

exports.getAuditLogs = async (req, res) => {

    try {

        const {
            search,
            action,
            module,
            status,
            user,
            from,
            to,
            page = 1,
            limit = 10
        } = req.query;

        let query = {};

        if (search) {

            query.$or = [

                {
                    userName: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    entityReference: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    ipAddress: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }

        if (action)
            query.action = action;

        if (module)
            query.module = module;

        if (status)
            query.status = status;

        if (user)
            query.userId = user;

        if (from && to) {

            query.createdAt = {

                $gte: new Date(from),

                $lte: new Date(to)

            };

        }

        const logs = await AuditLog.find(query)

            .sort({
                createdAt: -1
            })

            .skip((page - 1) * limit)

            .limit(Number(limit));

        const total = await AuditLog.countDocuments(query);

        res.json({

            status: 1,

            data: logs,

            pagination: {

                total,

                page: Number(page),

                limit: Number(limit),

                pages: Math.ceil(total / limit)

            }

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.getAuditLogDetails = async (req, res) => {

    try {

        const log = await AuditLog.findById(req.params.id);

        if (!log) {

            return res.status(404).json({

                status: 0,

                message: "Activity not found"

            });

        }

        res.json({

            status: 1,

            data: log

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.getAuditDashboard = async (req, res) => {

    try {
  
      const totalActivities = await AuditLog.countDocuments();
  
      const successfulActivities = await AuditLog.countDocuments({
        status: "Success"
      });
  
      const failedActivities = await AuditLog.countDocuments({
        status: "Failed"
      });
  
      const activeUsers = await AuditLog.distinct("userId");
  
      const loginActivities = await AuditLog.countDocuments({
        action: "Login"
      });
  
      res.json({
  
        status: 1,
  
        data: {
  
          totalActivities,
  
          successfulActivities,
  
          failedActivities,
  
          activeUsers: activeUsers.length,
  
          loginActivities
  
        }
  
      });
  
    } catch (err) {
  
      res.status(500).json({
  
        status: 0,
  
        message: err.message
  
      });
  
    }
  
  };

  exports.getFilterOptions = async(req,res)=>{

    try{
    
    const users=await AuditLog.distinct("userName");
    
    const modules=await AuditLog.distinct("module");
    
    const actions=await AuditLog.distinct("action");
    
    const statuses=await AuditLog.distinct("status");
    
    res.json({
    
    status:1,
    
    data:{
    
    users,
    
    modules,
    
    actions,
    
    statuses
    
    }
    
    });
    
    }catch(err){
    
    res.status(500).json({
    
    status:0,
    
    message:err.message
    
    });
    
    }
    
    };

exports.activitiesByModule = async (req, res) => {

    try {

        const data =
            await AuditLog.aggregate([

                {

                    $group: {

                        _id: "$module",

                        count: {

                            $sum: 1

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

            status: 1,

            data

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.activityTimeline = async (req, res) => {

    try {

        const data =
            await AuditLog.aggregate([

                {

                    $group: {

                        _id: {

                            day: {

                                $dayOfMonth: "$createdAt"

                            },

                            month: {

                                $month: "$createdAt"

                            }

                        },

                        total: {

                            $sum: 1

                        }

                    }

                },

                {

                    $sort: {

                        "_id.month": 1,

                        "_id.day": 1

                    }

                }

            ]);

        res.json({

            status: 1,

            data

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.deleteAuditLog = async (req, res) => {

    try {

        await AuditLog.findByIdAndDelete(
            req.params.id
        );

        res.json({

            status: 1,

            message: "Audit log deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};

exports.clearAuditLogs = async (req, res) => {

    try {

        await AuditLog.deleteMany({});

        res.json({

            status: 1,

            message: "All audit logs cleared"

        });

    }

    catch (err) {

        res.status(500).json({

            status: 0,

            message: err.message

        });

    }

};