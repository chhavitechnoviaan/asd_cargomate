const express = require("express");

const router = express.Router();

const {

getDashboard,
getOverview,
getRecentReports,
getPopularReports,
getInsights,
generateReport,
downloadReport,
exportData,
getFilterOptions

} = require("../controllers/reportsDashboardController");

router.get("/dashboard", getDashboard);

router.get("/overview", getOverview);

router.get("/recent", getRecentReports);

router.get("/popular", getPopularReports);

router.get("/insights", getInsights);

router.post("/generate", generateReport);

router.get("/download/:id", downloadReport);

router.get("/export", exportData);

router.get("/filter-options", getFilterOptions);

module.exports = router;