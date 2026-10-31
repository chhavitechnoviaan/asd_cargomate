const router = require("express").Router();
const ctrl = require("../controllers/tradeIntelController");

router.get("/map", ctrl.getMapData);
router.post("/insights", ctrl.createInsight);
router.get("/insights", ctrl.getInsights);
router.post("/companies", ctrl.createCompany);
router.get("/companies", ctrl.getCompanies);
router.get("/filters", ctrl.getFilters);

module.exports = router;