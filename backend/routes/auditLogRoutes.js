const express = require("express");
const router = express.Router();

const {
  getAuditLogs,
  getAuditLogDetails,
  getAuditDashboard,
  activitiesByModule,
  activityTimeline,
  deleteAuditLog,
  clearAuditLogs,
  getFilterOptions
} = require("../controllers/auditLogController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAuditDashboard
);

router.get(
  "/analytics/modules",
  protect,
  adminOnly,
  activitiesByModule
);

router.get(
  "/analytics/timeline",
  protect,
  adminOnly,
  activityTimeline
);

router.get(
  "/filter-options",
  protect,
  adminOnly,
  getFilterOptions
);

router.get(
  "/",
  protect,
  adminOnly,
  getAuditLogs
);

router.get(
  "/:id",
  protect,
  adminOnly,
  getAuditLogDetails
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteAuditLog
);

router.delete(
  "/clear/all",
  protect,
  adminOnly,
  clearAuditLogs
);

module.exports = router;