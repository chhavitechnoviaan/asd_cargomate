const Incentive = require("../models/Incentive");
const HSCode = require("../models/HSCode");
const Activity = require("../models/Activity");

exports.calculateIncentive = async (req, res) => {
  try {
    const {
      hsCode,
      exportCountry,
      importCountry,
      shipmentValue,
      quantity
    } = req.body;

    if (!hsCode || !shipmentValue) {
      return res.status(400).json({
        status: 0,
        message: "HS Code and shipment value required"
      });
    }
    const hs = await HSCode.findOne({ hsCode });

    if (!hs) {
      return res.status(404).json({
        status: 0,
        message: "HS Code not found"
      });
    }

    const rodtepRate = 4; // %
    const meisRate = 2; // %
    const stateRate = 2.76; // %

    const rodtepAmount = (shipmentValue * rodtepRate) / 100;
    const meisAmount = (shipmentValue * meisRate) / 100;
    const stateAmount = (shipmentValue * stateRate) / 100;

    const totalIncentive =
      rodtepAmount + meisAmount + stateAmount;

    const totalRate =
      rodtepRate + meisRate + stateRate;
    const saved = await Incentive.create({
      userId: req.user._id,
      scheme: "Mixed",
      amount: totalIncentive
    });
    await Activity.create({
      userId: req.user._id,
      type: "INCENTIVE_CHECKED",
      message: `Incentive calculated for HS ${hsCode}`
    });
    res.json({
      status: 1,
      data: {
        summary: {
          bestScheme: "RoDTEP",
          totalIncentive,
          totalRate: totalRate.toFixed(2),
          basedOn: "Export Value",
          inputTaxCredit: "Yes"
        },

        breakdown: [
          {
            scheme: "RoDTEP",
            type: "CENTRAL",
            rate: rodtepRate,
            benefit: rodtepAmount,
            eligibility: "Eligible"
          },
          {
            scheme: "MEIS",
            type: "CENTRAL",
            rate: meisRate,
            benefit: meisAmount,
            eligibility: "Eligible"
          },
          {
            scheme: "State Incentive",
            type: "STATE",
            rate: stateRate,
            benefit: stateAmount,
            eligibility: "Eligible"
          },
          {
            scheme: "IGST Refund",
            type: "CENTRAL",
            rate: 0,
            benefit: 0,
            eligibility: "Not Applicable"
          }
        ],

        meta: {
          hsCode,
          exportCountry,
          importCountry,
          shipmentValue,
          quantity
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