
const express = require("express");
const router = express.Router();
const plan = require("../controllers/planController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, plan.createPlan);
router.get("/", plan.getPlans);
router.put("/:id",protect, adminOnly, plan.updatePlan);
router.delete("/:id",protect, adminOnly, plan.deletePlan);
router.get("/analytics/:id", plan.getPlanAnalytics);

module.exports = router;