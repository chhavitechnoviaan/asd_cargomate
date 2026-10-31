const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getHSCodeList,
    getTradeFlow,
    getTopProducts,
    getCountries,
    getImporters,
    getExporters,
    getTrends,
    getHSCodeDetails,
    getFilterOptions
} = require("../controllers/hsCodeIntelligenceController");
router.get("/dashboard", getDashboard);
router.get("/hscode-list", getHSCodeList);
router.get("/hscode-details", getHSCodeDetails);
router.get("/trade-flow", getTradeFlow);
router.get("/trends", getTrends);
router.get("/countries", getCountries);
router.get("/top-products", getTopProducts);
router.get("/importers", getImporters);
router.get("/exporters", getExporters);
router.get("/filters", getFilterOptions);

module.exports = router;