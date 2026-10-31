const Module = require("../models/Module");
const Installed = require("../models/InstalledModule");
exports.getStats = async (req, res) => {

  const total = await Module.countDocuments();
  const installed = await Installed.countDocuments({ isInstalled: true });
  const enabled = await Installed.countDocuments({ isEnabled: true });

  res.json({
    status: 1,
    data: {
      total,
      installed,
      enabled,
      available: total - installed
    }
  });
};
exports.getInstalledModules = async (req, res) => {

  const data = await Installed.find()
    .populate("module");

  res.json({ status: 1, data });
};
exports.createModule = async (req, res) => {
  try {
    const { name, description, type, version } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 0,
        message: "Name is required"
      });
    }

    const module = await Module.create({
      name,
      description,
      type: type || "free",
      version,
      slug: name.toLowerCase().replace(/\s+/g, "-")
    });

    res.json({ status: 1, data: module });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getMarketplaceModules = async (req, res) => {

  const { search = "", type } = req.query;

  let filter = {
    name: { $regex: search, $options: "i" }
  };

  if (type) filter.type = type;

  const modules = await Module.find(filter);

  res.json({ status: 1, data: modules });
};
exports.installModule = async (req, res) => {

  const { moduleId } = req.body;

  let exists = await Installed.findOne({ module: moduleId });

  if (exists) {
    exists.isInstalled = true;
    exists.installedAt = new Date();
    await exists.save();
  } else {
    await Installed.create({
      module: moduleId,
      isInstalled: true,
      installedAt: new Date()
    });
  }

  res.json({ status: 1, message: "Module Installed" });
};
exports.toggleModule = async (req, res) => {

  const module = await Installed.findById(req.params.id);
  if (!module) {
    return res.status(404).json({ status: 0, message: "Module not found" });
  }

  module.isEnabled = !module.isEnabled;

  await module.save();

  res.json({ status: 1, data: module });
};
exports.deleteModule = async (req, res) => {

  await Installed.findByIdAndDelete(req.params.id);

  res.json({ status: 1, message: "Module Removed" });
};
exports.updateConfig = async (req, res) => {

  const module = await Installed.findByIdAndUpdate(
    req.params.id,
    { config: req.body },
    { new: true }
  );

  res.json({ status: 1, data: module });
};

exports.uploadModule = async (req, res) => {
  try {
    const { name, version, description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 0,
        message: "Module name required"
      });
    }

    const newModule = await Module.create({
      name,
      version,
      description,
      type: "custom",
      slug: name.toLowerCase().replace(/\s+/g, "-")
    });

    await Installed.create({
      module: newModule._id,
      isInstalled: true,
      isEnabled: false,
      installedAt: new Date(),
      config: {}
    });

    res.json({ status: 1, message: "Module Uploaded" });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};

