const express = require("express");
const router = express.Router();

const {
    getDashboard,
    getShipments,
    getFilterOptions,
    exportReport
} = require("../controllers/shipmentDatabaseController");
router.get("/dashboard", getDashboard);
router.get("/shipments", getShipments);
router.get("/filters", getFilterOptions);
router.get("/export-report", exportReport);

module.exports = router;