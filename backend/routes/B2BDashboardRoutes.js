const express = require("express");
const router = express.Router();

const {
  getDashboardMetrics,
  getOperationalInsights,
  getGlobalTradeOverview,
  getTradeValueTrend,
  getTopTradingPartners,
  getTopImportedProducts,
  getTopExportDestinations,
  getRecentShipments
} = require("../controllers/B2BDashboardController");

router.get("/dashboard-metrics",getDashboardMetrics);
router.get("/operational-insights",getOperationalInsights);
router.get("/global-trade-overview",getGlobalTradeOverview);
router.get("/trade-value-trend",getTradeValueTrend);
router.get("/top-trading-partners",getTopTradingPartners);
router.get("/top-imported-products",getTopImportedProducts);
router.get("/top-export-destinations",getTopExportDestinations);
router.get("/recent-shipments",getRecentShipments);

module.exports = router;