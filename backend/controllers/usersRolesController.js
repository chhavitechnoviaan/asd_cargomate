const User = require("../models/user");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

exports.getDashboard = async (req, res) => {

    try {
  
      const totalUsers = await User.countDocuments();
  
      const activeUsers = await User.countDocuments({
        status: "active"
      });
  
      const inactiveUsers = await User.countDocuments({
        status: "inactive"
      });
  
      const totalRoles = await Role.countDocuments();
  
      const adminRole = await Role.findOne({
        name: /admin/i
      });
  
      let adminUsers = 0;
  
      if (adminRole) {
  
        adminUsers = await User.countDocuments({
          roleId: adminRole._id
        });
  
      }
  
      res.json({
  
        status: 1,
  
        data: {
  
          totalUsers,
  
          activeUsers,
  
          inactiveUsers,
  
          totalRoles,
  
          adminUsers
  
        }
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
  
        message: error.message
  
      });
  
    }
  
  };

  exports.getUsers = async (req, res) => {

    try {
  
      const {
  
        search,
        role,
        status,
        department,
        page = 1,
        limit = 10
  
      } = req.query;
  
      let query = {};
  
      if (status) {
  
        query.status = status;
  
      }
  
      if (role) {
  
        query.roleId = role;
  
      }
  
      if (department) {
  
        query.department = department;
  
      }
  
      if (search) {
  
        query.$or = [
  
          {
            name: {
              $regex: search,
              $options: "i"
            }
          },
  
          {
            email: {
              $regex: search,
              $options: "i"
            }
          },
  
          {
            phone: {
              $regex: search,
              $options: "i"
            }
          }
  
        ];
  
      }
  
      const users = await User.find(query)
  
        .populate("roleId", "name")
  
        .populate("department", "name")
        .select("-password -otp")
  
        .sort({
  
          createdAt: -1
  
        })
  
        .skip((page - 1) * limit)
  
        .limit(Number(limit));
  
      const total = await User.countDocuments(query);
  
      res.json({
  
        status: 1,
  
        total,
  
        page: Number(page),
  
        data: users
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
  
        message: error.message
  
      });
  
    }
  
  };

  exports.getRoles = async (req, res) => {

    try {
  
      const roles = await Role.find()
  
        .sort({
  
          createdAt: -1
  
        });
  
      res.json({
  
        status: 1,
  
        data: roles
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
  
        message: error.message
  
      });
  
    }
  
  };

  exports.getRoleDistribution = async (req, res) => {

    try {
  
      const data = await User.aggregate([
  
        {
  
          $lookup: {
  
            from: "roles",
  
            localField: "roleId",
  
            foreignField: "_id",
  
            as: "role"
  
          }
  
        },
  
        {
  
          $unwind: "$role"
  
        },
  
        {
  
          $group: {
  
            _id: "$role.name",
  
            totalUsers: {
  
              $sum: 1
  
            }
  
          }
  
        },
  
        {
  
          $sort: {
  
            totalUsers: -1
  
          }
  
        }
  
      ]);
  
      res.json({
  
        status: 1,
  
        data
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
  
        message: error.message
  
      });
  
    }
  
  };

  exports.inviteUser = async (req, res) => {

    try {
  
      const {
  
        name,
  
        email,
  
        password,
  
        phone,
  
        roleId,
  
        department
  
      } = req.body;
  
      const exist = await User.findOne({
  
        email
  
      });
  
      if (exist) {
  
        return res.status(400).json({
  
          status: 0,
  
          message: "Email already exists"
  
        });
  
      }
  
      const hash = await bcrypt.hash(password, 10);
  
      const user = await User.create({
  
        name,
  
        email,
  
        password: hash,
  
        phone,
  
        roleId,
  
        department
  
      });
  
      res.json({
  
        status: 1,
  
        message: "User invited successfully",
  
        data: user
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
  
        message: error.message
  
      });
  
    }
  
  };

  

  exports.deleteUser = async (req, res) => {

    try {
  
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
  
        return res.status(404).json({
  
          status: 0,
          message: "User not found"
  
        });
  
      }
  
      res.json({
  
        status: 1,
        message: "User deleted successfully"
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
        message: error.message
  
      });
  
    }
  
  };
  
  exports.changeStatus = async (req, res) => {

    try {
  
      const user = await User.findById(req.params.id);
  
      if (!user) {
  
        return res.status(404).json({
  
          status: 0,
          message: "User not found"
  
        });
  
      }
  
      user.status =
        user.status === "active"
          ? "inactive"
          : "active";
  
      await user.save();
  
      res.json({
  
        status: 1,
        message: "Status updated successfully",
        data: user
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
        message: error.message
  
      });
  
    }
  
  };

  exports.getActivity = async (req, res) => {

    try {
  
      const sevenDaysAgo = new Date();
  
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      const newUsers = await User.countDocuments({
  
        createdAt: {
          $gte: sevenDaysAgo
        }
  
      });
  
      const loggedInUsers = await User.countDocuments({
  
        lastLogin: {
          $gte: sevenDaysAgo
        }
  
      });
  
      const inactiveUsers = await User.countDocuments({
  
        status: "inactive"
  
      });
  
      const passwordResets = await User.countDocuments({
  
        otp: {
          $ne: null
        }
  
      });
  
      res.json({
  
        status: 1,
  
        data: {
  
          newUsers,
  
          loggedInUsers,
  
          inactiveUsers,
  
          passwordResets
  
        }
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
        message: error.message
  
      });
  
    }
  
  };

  exports.updateUser = async (req, res) => {
    try {
  
      const {
        name,
        email,
        phone,
        roleId,
        department,
        status
      } = req.body;
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          phone,
          roleId,
          department,
          status
        },
        {
          new: true
        }
      );
  
      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found"
        });
      }
  
      res.json({
        status: 1,
        message: "User updated successfully",
        data: user
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.getFilterOptions = async (req, res) => {

    try {
  
      const roles = await Role.find({}, "name");
  
      const departments = await User.distinct("department");
  
      const statuses = [
  
        "active",
  
        "inactive"
  
      ];
  
      res.json({
  
        status: 1,
  
        data: {
  
          roles,
  
          departments,
  
          statuses
  
        }
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
        message: error.message
  
      });
  
    }
  
  };

  exports.searchUsers = async (req, res) => {

    try {
  
      const keyword = req.query.keyword || "";
  
      const users = await User.find({
  
        $or: [
  
          {
  
            name: {
  
              $regex: keyword,
  
              $options: "i"
  
            }
  
          },
  
          {
  
            email: {
  
              $regex: keyword,
  
              $options: "i"
  
            }
  
          },
  
          {
  
            phone: {
  
              $regex: keyword,
  
              $options: "i"
  
            }
  
          }
  
        ]
  
      })
  
        .populate("roleId", "name")
        .populate("department", "name");
  
      res.json({
  
        status: 1,
  
        data: users
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        status: 0,
        message: error.message
  
      });
  
    }
  
  };

