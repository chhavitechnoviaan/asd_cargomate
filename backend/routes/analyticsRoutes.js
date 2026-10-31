const express = require("express");
const router = express.Router();

const {
    getDashboard,
    shipmentOverTime,
    shipmentMode,
    topOrigins,
    topDestinations,
    spendByCategory,
    carrierPerformance,
    shipmentStatusOverview,
    transitTrend,
    getInsights
} = require("../controllers/analyticsController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.get(
    "/dashboard",
    protect,
    adminOnly,
    getDashboard
);

router.get(
    "/shipment-over-time",
    protect,
    adminOnly,
    shipmentOverTime
);

router.get(
    "/shipment-mode",
    protect,
    adminOnly,
    shipmentMode
);

router.get(
    "/top-origins",
    protect,
    adminOnly,
    topOrigins
);

router.get(
    "/top-destinations",
    protect,
    adminOnly,
    topDestinations
);

router.get(
    "/spend-category",
    protect,
    adminOnly,
    spendByCategory
);

router.get(
    "/carrier-performance",
    protect,
    adminOnly,
    carrierPerformance
);

router.get(
    "/status-overview",
    protect,
    adminOnly,
    shipmentStatusOverview
);

router.get(
    "/transit-trend",
    protect,
    adminOnly,
    transitTrend
);

router.get(
    "/insights",
    protect,
    adminOnly,
    getInsights
);

module.exports = router;