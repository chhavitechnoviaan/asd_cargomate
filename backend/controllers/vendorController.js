const User = require("../models/user");
const Role = require("../models/Role");
const Shipment = require("../models/Shipment");

const getB2BRole = async () => {
  return await Role.findOne({
    name: {
      $regex: /^b2b$/i,
    },
  });
};

const getB2BUser = async (id) => {
  const b2bRole = await getB2BRole();

  if (!b2bRole) {
    return {
      error: "B2B role not found",
      statusCode: 404,
    };
  }

  const user = await User.findOne({
    _id: id,
    roleId: b2bRole._id,
  });

  if (!user) {
    return {
      error: "B2B user not found",
      statusCode: 404,
    };
  }

  return {
    user,
    b2bRole,
  };
};

// ================= GET ALL B2B USERS =================

exports.getB2BUsers = async (req, res) => {
  try {
    const b2bRole = await getB2BRole();

    if (!b2bRole) {
      return res.status(404).json({
        status: 0,
        message: "B2B role not found",
      });
    }

    const users = await User.find({
      roleId: b2bRole._id,
    })
      .populate("roleId", "name")
      .select("-password")
      .sort({ createdAt: -1 });

    const userIds = users.map((user) => user._id);

    const shipmentCounts = await Shipment.aggregate([
      {
        $match: {
          userId: {
            $in: userIds,
          },
        },
      },
      {
        $group: {
          _id: "$userId",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const shipmentCountMap = {};

    shipmentCounts.forEach((item) => {
      shipmentCountMap[item._id.toString()] = item.count;
    });

    const usersWithShipments = users.map((user) => {
      const userData = user.toObject();

      return {
        ...userData,
        shipmentCount:
          shipmentCountMap[user._id.toString()] || 0,
      };
    });

    res.json({
      status: 1,
      data: usersWithShipments,
      total: usersWithShipments.length,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

// ================= GET SINGLE B2B USER =================

exports.getB2BUserById = async (req, res) => {
  try {
    const b2bRole = await getB2BRole();

    if (!b2bRole) {
      return res.status(404).json({
        status: 0,
        message: "B2B role not found",
      });
    }

    const user = await User.findOne({
      _id: req.params.id,
      roleId: b2bRole._id,
    })
      .populate("roleId", "name")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "B2B user not found",
      });
    }

    const shipmentCount = await Shipment.countDocuments({
      userId: user._id,
    });

    res.json({
      status: 1,
      data: {
        ...user.toObject(),
        shipmentCount,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

// ================= B2B USER STATS =================

exports.getB2BUserStats = async (req, res) => {
  try {
    const b2bRole = await getB2BRole();

    if (!b2bRole) {
      return res.status(404).json({
        status: 0,
        message: "B2B role not found",
      });
    }

    const users = await User.find({
      roleId: b2bRole._id,
    }).select("_id status kycStatus");

    const userIds = users.map((user) => user._id);

    const totalUsers = users.length;

    const activeUsers = users.filter(
      (user) => user.status === "active"
    ).length;

    const verifiedUsers = users.filter(
      (user) => user.kycStatus === "Verified"
    ).length;

    const totalShipments = await Shipment.countDocuments({
      userId: {
        $in: userIds,
      },
    });

    res.json({
      status: 1,
      data: {
        totalUsers,
        activeUsers,
        totalShipments,
        verifiedUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

// ================= APPROVE KYC =================

exports.approveKYC = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await getB2BUser(userId);

    if (result.error) {
      return res.status(result.statusCode).json({
        status: 0,
        message: result.error,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          kycStatus: "Verified",
          kycVerifiedAt: new Date(),
          kycRejectedAt: null,
          kycRejectionReasons: [],
          kycRejectionNote: "",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.json({
      status: 1,
      message: "KYC approved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

// ================= REJECT KYC =================

exports.rejectKYC = async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      reasons = [],
      note = "",
    } = req.body;

    if (!Array.isArray(reasons) || reasons.length === 0) {
      return res.status(400).json({
        status: 0,
        message: "At least one rejection reason is required",
      });
    }

    if (!note || !note.trim()) {
      return res.status(400).json({
        status: 0,
        message: "Rejection note is required",
      });
    }

    const result = await getB2BUser(userId);

    if (result.error) {
      return res.status(result.statusCode).json({
        status: 0,
        message: result.error,
      });
    }

    const cleanedReasons = reasons
      .filter(
        (reason) =>
          typeof reason === "string" &&
          reason.trim().length > 0
      )
      .map((reason) => reason.trim());

    if (cleanedReasons.length === 0) {
      return res.status(400).json({
        status: 0,
        message: "Valid rejection reason is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          kycStatus: "Rejected",
          kycRejectedAt: new Date(),
          kycVerifiedAt: null,
          kycRejectionReasons: cleanedReasons,
          kycRejectionNote: note.trim(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.json({
      status: 1,
      message: "KYC rejected successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

// ================= SUSPEND B2B USER =================

exports.suspendB2BUser = async (req, res) => {
  try {
    const result = await getB2BUser(req.params.id);

    if (result.error) {
      return res.status(result.statusCode).json({
        status: 0,
        message: result.error,
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "inactive",
          accountStatus: "Inactive",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.json({
      status: 1,
      message: "B2B user suspended successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};