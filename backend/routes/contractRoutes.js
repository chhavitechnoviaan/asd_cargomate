const express = require("express");
const router = express.Router();

const {

getDashboard,
getContracts,
getStatusSummary,
getTypeSummary,
getTopParties,
getInsights,
getValueTrend,
getExpiringContracts,
getFilterOptions

} = require("../controllers/contractController");

router.get("/dashboard", getDashboard);

router.get("/", getContracts);

router.get("/status-summary", getStatusSummary);

router.get("/type-summary", getTypeSummary);

router.get("/top-parties", getTopParties);

router.get("/insights", getInsights);

router.get("/value-trend", getValueTrend);

router.get("/expiring", getExpiringContracts);

router.get("/filter-options", getFilterOptions);

module.exports = router;