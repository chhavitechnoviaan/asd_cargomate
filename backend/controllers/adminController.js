const User = require("../models/user");
const Role = require("../models/Role");

exports.getDashboard = async (req, res) => {
  try {
    const roleDocs = await Role.find({ name: { $in: [/^user$/i, /^b2b$/i, /^staff$/i] } }).lean();
    const countFor = (name) => {
      const role = roleDocs.find(r => r.name?.toLowerCase() === name);
      return role ? User.countDocuments({ roleId: role._id }) : Promise.resolve(0);
    };
    const [totalUsers, totalVendors, totalStaff] = await Promise.all([countFor("user"), countFor("b2b"), countFor("staff")]);
    const totalSubscription = 860;
    const totalShipment = 4320;
    const revenue = 128500;
    const pendingApprovals = 15;

    res.json({
      stats: {
        totalUsers,
        totalVendors,
        totalStaff,
        totalSubscription,
        totalShipment,
        revenue,
        pendingApprovals
      },
      charts: {
        revenueGrowth: [20, 40, 30, 50, 60],
        userGrowth: [10, 25, 35, 45, 70]
      },

      recentActivity: [
        "User registered",
        "Vendor approved",
        "Shipment created"
      ],

      systemStatus: {
        api: "Active",
        server: "Running"
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};