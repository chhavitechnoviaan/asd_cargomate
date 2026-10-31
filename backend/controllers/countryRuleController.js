const CountryRule = require("../models/CountryRule");

const generateRuleCode = async () => {
  const count = await CountryRule.countDocuments();
  return `RUL-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
};
exports.createRule = async (req, res) => {
    try {
      const {
        ruleName,
        ruleCode,
        ruleType,
        sourceCountry,
        destinationCountry,
        region,
        tradeZone,
        taxRules,
        compliance,
        aiData,
        automation,
        importRestrictions,
        status,
        hsCode
      } = req.body;
      if (!ruleName || !sourceCountry || !destinationCountry) {
        return res.status(400).json({
          status: 0,
          message: "Required fields missing"
        });
      }
      if (ruleCode) {
        const exists = await CountryRule.findOne({ ruleCode });
      
        if (exists) {
          return res.status(400).json({
            status: 0,
            message: "Rule code already exists"
          });
        }
      }

     

      let finalRuleCode = ruleCode;

if (!finalRuleCode) {
  finalRuleCode = await generateRuleCode();
}
  
      const rule = await CountryRule.create({
        ruleName,
        ruleCode: finalRuleCode,
        ruleType,
        sourceCountry,
        destinationCountry,
        region,
        tradeZone,
        taxRules,
        compliance,
        aiData,
        automation,
        importRestrictions,
        status,
        hsCode
      });
  
      res.json({
        status: 1,
        message: "Country rule created",
        data: rule
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.getRules = async (req, res) => {
    try {
      const {
        search = "",
        hsCode,
        country,
        status,
        page = 1,
        limit = 10
      } = req.query;
  
      let query = {};
      if (search) {
        query.$or = [
          { ruleName: { $regex: search, $options: "i" } },
          { sourceCountry: { $regex: search, $options: "i" } },
          { destinationCountry: { $regex: search, $options: "i" } }
        ];
      }
      if (hsCode) query.hsCode = hsCode;
      if (country) query.destinationCountry = country;
      if (status) query.status = status;
  
      const data = await CountryRule.find(query)
        .populate("hsCode")
        .populate("sourceCountry")
  .populate("destinationCountry")
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
  
      const total = await CountryRule.countDocuments(query);
  
      res.json({
        status: 1,
        data,
        total
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.getSingleRule = async (req, res) => {
    try {
      const data = await CountryRule.findById(req.params.id)
        .populate("hsCode");
  
      if (!data) {
        return res.status(404).json({
          status: 0,
          message: "Rule not found"
        });
      }
  
      res.json({
        status: 1,
        data
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.updateRule = async (req, res) => {
    try {
      const updated = await CountryRule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      res.json({
        status: 1,
        data: updated
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.deleteRule = async (req, res) => {
    try {
      await CountryRule.findByIdAndUpdate(req.params.id, {
        status: "inactive"
      });
  
      res.json({
        status: 1,
        message: "Rule deactivated"
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.getStats = async (req, res) => {
    try {
      const total = await CountryRule.countDocuments();
  
      const avgVat = await CountryRule.aggregate([
        {
          $group: {
            _id: null,
            avg: { $avg: "$taxRules.vatGst" }
          }
        }
      ]);
  
      const restricted = await CountryRule.countDocuments({
        importRestrictions: { $ne: "None" }
      });
  
      res.json({
        status: 1,
        data: {
          totalCountries: total,
          avgVat: avgVat[0]?.avg || 0,
          restrictedCountries: restricted
        }
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };