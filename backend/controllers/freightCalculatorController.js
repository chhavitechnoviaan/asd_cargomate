const Freight = require("../models/freight");
const Activity = require("../models/Activity");

exports.calculateFreight = async (req, res) => {
  try {
    const {
      origin,
      destination,
      mode,
      weight,
      commodity
    } = req.body;

    if (!origin || !destination || !weight) {
      return res.status(400).json({
        status: 0,
        message: "Required fields missing"
      });
    }

    const airCost = weight * 50;
    const seaLCLCost = weight * 35;
    const seaFCLCost = weight * 30;
    await Freight.create({
      userId: req.user._id,
      origin,
      destination,
      mode,
      weight,
      cost: airCost,
      estimatedTime: "3-5 days"
    });
    await Activity.create({
      userId: req.user._id,
      type: "FREIGHT_CALCULATED",
      message: `Freight calculated for ${origin} → ${destination}`
    });
    res.json({
      status: 1,
      data: {
        summary: {
          bestMode: "Air Freight",
          recommendedRoute: `${origin} → ${destination}`,
          transitTime: "3-5 Days",
          totalCost: airCost,
          costPerKg: airCost / weight
        },

        options: [
          {
            type: "Air Freight",
            tag: "Best Value",
            cost: airCost,
            transitTime: "3-5 Days",
            departure: "26 Apr 2025",
            arrival: "30 Apr 2025"
          },
          {
            type: "Sea Freight (LCL)",
            tag: "Best Balance",
            cost: seaLCLCost,
            transitTime: "5-10 Days",
            departure: "26 Apr 2025",
            arrival: "30 Apr 2025"
          },
          {
            type: "Sea Freight (FCL)",
            tag: "Lowest Cost",
            cost: seaFCLCost,
            transitTime: "7-12 Days",
            departure: "26 Apr 2025",
            arrival: "30 Apr 2025"
          }
        ],

        costBreakdown: {
          baseFreight: airCost * 0.75,
          fuel: airCost * 0.15,
          handling: airCost * 0.05,
          documentation: airCost * 0.03,
          others: airCost * 0.02
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