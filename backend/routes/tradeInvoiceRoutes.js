const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {

getDashboard,
getInvoices,
getStatusSummary,
getValueTrend,
getRecentInvoices,
getTopParties,
getOverdueInvoices,
getInsights,
getFilterOptions

} = require("../controllers/tradeInvoiceController");

router.get("/dashboard",protect, getDashboard);

router.get("/",protect, getInvoices);

router.get("/status-summary",protect, getStatusSummary);

router.get("/value-trend",protect, getValueTrend);

router.get("/recent",protect, getRecentInvoices);

router.get("/top-parties",protect, getTopParties);

router.get("/overdue",protect, getOverdueInvoices);

router.get("/insights",protect, getInsights);

router.get("/filter-options",protect, getFilterOptions);

module.exports = router;