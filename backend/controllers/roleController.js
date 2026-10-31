const Role = require("../models/Role");

const allModules = [
  "dashboard",
  "booking",
  "shipment",
  "tracking",
  "documents",
  "earnings",
  "ads",
  "support",
  "settings"
];

const fullAccess = {
  view: true,
  add: true,
  edit: true,
  delete: true
};
exports.createRole = async (req, res) => {
  try {
    let { name, permissions } = req.body;
    const finalPermissions = {};

    allModules.forEach((module) => {
      finalPermissions[module] = permissions?.[module] || {
        view: false,
        add: false,
        edit: false,
        delete: false
      };
    });
    if (name === "admin") {
      allModules.forEach((module) => {
        finalPermissions[module] = fullAccess;
      });
    }

    const role = await Role.create({
      name,
      permissions: finalPermissions
    });

    res.json({
      status: 1,
      message: "Role created successfully",
      data: role
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
const User = require("../models/user");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    const rolesWithCount = await Promise.all(
      roles.map(async (role) => {
        const userCount = await User.countDocuments({
          roleId: role._id
        });

        return {
          ...role.toObject(),
          userCount
        };
      })
    );

    res.json({
      status: 1,
      data: rolesWithCount
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        status: 0,
        message: "Role not found"
      });
    }

    res.json({
      status: 1,
      data: role
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.updateRole = async (req, res) => {
  try {
    const { permissions, name } = req.body;

    const finalPermissions = {};

    allModules.forEach((module) => {
      finalPermissions[module] = permissions?.[module] || {
        view: false,
        add: false,
        edit: false,
        delete: false
      };
    });

    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name,
        permissions: finalPermissions
      },
      { new: true }
    );

    res.json({
      status: 1,
      message: "Role updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);

    res.json({
      status: 1,
      message: "Role deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};