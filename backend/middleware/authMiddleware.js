

const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate("roleId");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    if (user.status === "inactive" || !user.roleId) return res.status(403).json({msg:"Account unavailable"});
    req.user = user;
    req.user.roleName = String(user.roleId?.name || "").trim().toLowerCase();

    next();

  } catch (err) {
    return res.status(401).json({
      msg: "Invalid token",
      error: err.message
    });
  }
};

exports.adminOnly = (req, res, next) => {
  if (String(req.user?.roleName || "").toLowerCase() !== "admin") {
    return res.status(403).json({ msg: "Admin only access" });
  }
  next();
};

exports.checkPermission = (module, action) => {
  return (req, res, next) => {
    if (String(req.user?.roleName || "").toLowerCase() === "admin") {
      return next();
    }

    const permissions = req.user.roleId?.permissions;

    if (!permissions) {
      return res.status(403).json({ msg: "No permissions found" });
    }

    const modulePermission = permissions[module];

    if (!modulePermission || !modulePermission[action]) {
      return res.status(403).json({
        msg: `You are not allowed to ${action} in ${module}`
      });
    }

    next();
  };
};
exports.allowRoles = (...roles) => (req,res,next) => roles.includes(req.user?.roleName) ? next() : res.status(403).json({msg:"Forbidden"});
