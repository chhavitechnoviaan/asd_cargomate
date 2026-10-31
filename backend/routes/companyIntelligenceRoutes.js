const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getCompanyProfile,
    getTopHSCodes,
    getTopTradingPartners,
    getTradeTrend,
    getImportExportChart,
    getShipmentTrend,
    getTopProducts,
    getRecentShipments,
    getTopCountries,
    getFinancialSnapshot,
    getFilterOptions,
    getCompanyDetails
} = require("../controllers/companyIntelligenceController");

router.get("/dashboard", getDashboard);
router.get("/company-profile", getCompanyProfile);
router.get("/top-hs-codes", getTopHSCodes);
router.get("/top-trading-partners", getTopTradingPartners);
router.get("/trade-trend", getTradeTrend);
router.get("/import-export-chart", getImportExportChart);
router.get("/shipment-trend", getShipmentTrend);
router.get("/top-products", getTopProducts);
router.get("/recent-shipments", getRecentShipments);
router.get("/top-countries", getTopCountries);
router.get("/financial-snapshot", getFinancialSnapshot);
router.get("/filters", getFilterOptions);
router.get("/details/:id", getCompanyDetails);

module.exports = router;