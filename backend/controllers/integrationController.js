const Integration = require("../models/Integration");
const IntegrationLog = require("../models/IntegrationLog");
exports.getIntegrations = async (req, res) => {
  try {
    const data = await Integration.find();

    res.json({
      status: 1,
      data
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.connectIntegration = async (req, res) => {
  try {
   
    const { apiKey } = req.body;

    const { code } = req.params;

    const integration = await Integration.findOneAndUpdate(
      { code },
      {
        apiKey,
        status: "connected",
        lastSync: new Date()
      },
      { new: true }
    );
    
    if (!integration) {
      return res.status(404).json({
        status: 0,
        message: "Integration not found"
      });
    }
    
    await IntegrationLog.create({
      integrationId: integration._id,
      action: "connect",
      status: "success"
    });
   

    res.json({
      status: 1,
      message: "Connected successfully",
      data: integration
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.disconnectIntegration = async (req, res) => {
  try {
    const { code } = req.params;

    const integration = await Integration.findOneAndUpdate(
      { code }, // ✅ correct
      {
        status: "disconnected",
        apiKey: ""
      },
      { new: true }
    );

    await IntegrationLog.create({
      integrationId: integration._id, // ✅ correct
      action: "disconnect",
      status: "success"
    });

    res.json({
      status: 1,
      message: "Disconnected",
      data: integration
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};
exports.testConnection = async (req, res) => {
  try {
  const { code } = req.params;

const integration = await Integration.findOne({ code });

let success = integration?.apiKey ? true : false;

await IntegrationLog.create({
  integrationId: integration._id,
  action: "test",
  status: success ? "success" : "failed"
});

    if (success) {
      integration.totalCalls += 1;
      integration.lastSync = new Date();
      await integration.save();
    }

    res.json({
      status: success ? 1 : 0,
      message: success ? "Connection successful" : "Invalid API key"
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.getStats = async (req, res) => {
  try {
    const total = await Integration.countDocuments();

    const active = await Integration.countDocuments({
      status: "connected"
    });

    const calls = await Integration.aggregate([
      {
        $group: {
          _id: null,
          totalCalls: { $sum: "$totalCalls" }
        }
      }
    ]);

    res.json({
      status: 1,
      data: {
        totalIntegration: total,
        activeConnection: active,
        apiCallsToday: calls[0]?.totalCalls || 0
      }
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};
exports.seedIntegrations = async (req, res) => {
  try {
    const list = [
      { name: "DHL Express API", code: "dhl" },
      { name: "UPS Developer API", code: "ups" },
      { name: "FedEx API", code: "fedex" },
      { name: "Aramex API", code: "aramex" },
      { name: "Blue Dart API", code: "bluedart" },
      { name: "Custom API", code: "custom" }
    ];

    for (let item of list) {
      await Integration.updateOne(
        { code: item.code },
        item,
        { upsert: true }
      );
    }

    res.json({
      status: 1,
      message: "Seeded"
    });

  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
};