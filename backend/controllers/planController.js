
const Plan = require("../models/Plan");
const User = require("../models/user");

exports.createPlan = async (req, res) => {
  try {
    const {
      name,
      planType,
      price,
      billingCycle,
      description,
      features,
      limits,
      status,
      isPopular,
      isRecommended
    } = req.body;
    if (!name || !planType || !price) {
      return res.status(400).json({
        status: 0,
        message: "Required fields missing"
      });
    }

    const plan = await Plan.create({
      name,
      planType,
      price,
      billingCycle,
      description,
      features,
      limits,
      status,
      isPopular,
      isRecommended
    });

    res.json({
      status: 1,
      message: "Plan created",
      data: plan
    });

  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

  exports.getPlans = async (req, res) => {
    try {
      const { type } = req.query; // monthly / yearly
  
      const plans = await Plan.find({ planType: type });
  
      const result = await Promise.all(
        plans.map(async (plan) => {
          const subscribers = await User.countDocuments({
            planId: plan._id
          });
  
          return {
            ...plan.toObject(),
            subscribers
          };
        })
      );
  
      res.json({
        status: 1,
        data: result
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };

  exports.updatePlan = async (req, res) => {
    try {
      const updated = await Plan.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
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

  exports.deletePlan = async (req, res) => {
    await Plan.findByIdAndDelete(req.params.id);
  
    res.json({
      status: 1,
      message: "Plan deleted"
    });
  };


  exports.getPlanAnalytics = async (req, res) => {
    try {
      const totalSubscribers = await User.countDocuments({
        planId: req.params.id
      });
  
      const plan = await Plan.findById(req.params.id);
  
      const revenue = totalSubscribers * plan.price;
  
      res.json({
        status: 1,
        data: {
          totalSubscribers,
          revenue,
          renewalRate: 78.6, // dummy for now
          activeUsers: totalSubscribers // approx
        }
      });
  
    } catch (err) {
      res.status(500).json({
        status: 0,
        message: err.message
      });
    }
  };