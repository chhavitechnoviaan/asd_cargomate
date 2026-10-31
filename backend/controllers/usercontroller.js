
const User = require("../models/user");

const Role = require("../models/Role");

exports.createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        status: 0,
        message: "Email already exists"
      });
    }
    const roleDoc = await Role.findOne({ name: role });

    if (!roleDoc) {
      return res.status(400).json({
        status: 0,
        message: "Invalid role"
      });
    }

    const user = await User.create({
      name,
      email,
      roleId: roleDoc._id, // ✅ FIX
      status
    });

    res.json({
      status: 1,
      message: "User created successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};


exports.getUsers = async (req, res) => {
    try {
      const { search = "", page = 1, limit = 10 } = req.query;
  
      const Role = require("../models/Role");
      const normalRole = await Role.findOne({ name: /^user$/i }).select("_id");
      const query = {
        name: { $regex: search, $options: "i" },
        roleId: normalRole ? normalRole._id : { $in: [] }
      };
  
      const users = await User.find(query)
      .select("-password")
      .populate("roleId", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));
      
      const total = await User.countDocuments(query);
  
      res.json({
        status: 1,
        message: "Success",
        data: {
          users,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit)
          }
        }
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
  
      res.json({
        status: 1,
        message: "User deleted successfully"
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { role, ...rest } = req.body;
  
      let updateData = { ...rest };
  
      if (role) {
        const roleDoc = await Role.findOne({ name: role });
  
        if (!roleDoc) {
          return res.status(400).json({
            status: 0,
            message: "Invalid role"
          });
        }
  
        updateData.roleId = roleDoc._id;
      }
  
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      ).select("-password");
  
      res.json({
        status: 1,
        message: "User updated successfully",
        data: updated
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("-password")
        .populate("roleId", "name"); // 🔥 role name bhi aa jayega
  
      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found"
        });
      }
  
      res.json({
        status: 1,
        data: user
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.toggleStatus = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      user.status = user.status === "active" ? "inactive" : "active";
      await user.save();
  
      res.json({
        status: 1,
        message: "User status updated",
        data: user
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  const bcrypt = require("bcryptjs");

exports.resetUserPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 0,
        message: "Password required"
      });
    }
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        status: 0,
        message: "Password must be 8 chars, 1 uppercase, 1 number"
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.id, {
      password: hashed
    });

    res.json({
      status: 1,
      message: "Password reset successfully"
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

exports.sendInvite = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "User not found"
        });
      }
      const inviteLink = `https://yourapp.com/invite/${user._id}`;
  
      console.log("Invite link:", inviteLink);
  
      res.json({
        status: 1,
        message: "Invite link sent successfully",
        data: {
          inviteLink
        }
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };