const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getTradeFlow,
    getTopRoutes,
    getTopCountries,
    getRegionAnalysis,
    getSummary,
    getCountryOverview,
    getFilterOptions
} = require("../controllers/tradeMapController");
router.get("/dashboard", getDashboard);
router.get("/trade-flow", getTradeFlow);
router.get("/top-routes", getTopRoutes);
router.get("/country-overview", getCountryOverview);
router.get("/top-countries", getTopCountries);
router.get("/region-analysis", getRegionAnalysis);
router.get("/summary", getSummary);
router.get("/filters", getFilterOptions);

module.exports = router;