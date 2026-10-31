const Department = require("../models/Department");
const User = require("../models/user");
const Role = require("../models/DepartmentRole");
const Access = require("../models/DepartmentAccess");
exports.createDepartment = async (req, res) => {
  try {
    const { name, description, type, members } = req.body;

    const dept = await Department.create({
      name,
      description,
      type,
      members
    });
    await User.updateMany(
      { _id: { $in: members } },
      { department: dept._id }
    );
    await Access.create({
      department: dept._id,
      permissions: {
        dashboard: false,
        users: false,
        reports: false,
        settings: false
      }
    });

    res.json({ status: 1, data: dept });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getDepartments = async (req, res) => {

  const depts = await Department.find()
    .populate("members", "name avatar")
    .populate("roles");

  const access = await Access.find();

  const final = depts.map(d => {
    const acc = access.find(a => a.department.toString() === d._id.toString());

    return {
      ...d.toObject(),
      access: acc?.permissions || {}
    };
  });

  res.json({ status: 1, data: final });
};
exports.getDepartment = async (req, res) => {
  const dept = await Department.findById(req.params.id)
    .populate("members")
    .populate("roles");

  res.json({ status: 1, data: dept });
};
exports.updateDepartment = async (req, res) => {
  const { members = [] } = req.body;
  const deptId = req.params.id;

  const dept = await Department.findByIdAndUpdate(
    deptId,
    req.body,
    { new: true }
  );
  await User.updateMany(
    { department: deptId, _id: { $nin: members } },
    { $unset: { department: "" } }
  );
  await User.updateMany(
    { _id: { $in: members } },
    { department: deptId }
  );

  res.json({ status: 1, data: dept });
};
exports.deleteDepartment = async (req, res) => {
  const deptId = req.params.id;

  await Department.findByIdAndDelete(deptId);

  await Role.deleteMany({ department: deptId });
  await Access.deleteMany({ department: deptId });

  await User.updateMany(
    { department: deptId },
    { $unset: { department: "" } }
  );

  res.json({ status: 1 });
};
exports.searchUsers = async (req, res) => {
  const { search = "" } = req.query;

  const users = await User.find({
    name: { $regex: search, $options: "i" }
  }).limit(10);

  res.json({ status: 1, data: users });
};
exports.createRole = async (req, res) => {

  const role = await Role.create(req.body);
  await Department.findByIdAndUpdate(role.department, {
    $push: { roles: role._id }
  });

  res.json({ status: 1, data: role });
};
exports.updateRole = async (req, res) => {

  const role = await Role.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ status: 1, data: role });
};
exports.getAccess = async (req, res) => {

  const data = await Access.find().populate("department");

  res.json({ status: 1, data });
};



exports.updateAccess = async (req, res) => {
  const { permissions } = req.body;

  const data = await Access.findOneAndUpdate(
    { department: req.params.departmentId },
    { permissions },
    { new: true }
  );

  res.json({ status: 1, data });
};