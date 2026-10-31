const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

const {

getDashboard,
getAlerts,
getNotifications,
getAlertFilters,
getNotificationFilters,
markNotificationRead,
markAllNotificationsRead,
resolveAlert,
deleteAlert,
deleteNotification

} = require("../controllers/alertsNotificationController");
router.get("/dashboard",protect, getDashboard);
router.get("/alerts", getAlerts);

router.get("/alerts/filter-options", getAlertFilters);

router.patch("/alerts/resolve/:id", resolveAlert);

router.delete("/alerts/:id", deleteAlert);
router.get("/notifications", protect, getNotifications);

router.get("/notifications/filter-options", getNotificationFilters);

router.patch("/notifications/read/:id", protect, markNotificationRead);

router.patch("/notifications/read-all", protect, markAllNotificationsRead);

router.delete("/notifications/:id", protect, deleteNotification);

module.exports = router;