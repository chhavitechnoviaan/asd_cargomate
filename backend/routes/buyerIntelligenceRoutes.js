const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getTopBuyers,
    getTradeTrend,
    getCountries,
    getGrowthBuyers,
    getBuyerConcentration,
    getRecentShipments,
    getFilterOptions
} = require("../controllers/buyerIntelligenceController");
router.get("/dashboard", getDashboard);
router.get("/top-buyers", getTopBuyers);
router.get("/growth-buyers", getGrowthBuyers);
router.get("/buyer-concentration", getBuyerConcentration);
router.get("/trade-trend", getTradeTrend);
router.get("/countries", getCountries);
router.get("/recent-shipments", getRecentShipments);
router.get("/filters", getFilterOptions);

module.exports = router;