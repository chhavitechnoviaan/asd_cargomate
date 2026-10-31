const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    protect,
    reportController.getDashboard
);

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

router.get(
    "/categories",
    protect,
    reportController.getCategories
);

/*
|--------------------------------------------------------------------------
| Quick Access
|--------------------------------------------------------------------------
*/

router.get(
    "/quick-access",
    protect,
    reportController.getQuickAccess
);

/*
|--------------------------------------------------------------------------
| Storage
|--------------------------------------------------------------------------
*/

router.get(
    "/storage",
    protect,
    reportController.getStorage
);

/*
|--------------------------------------------------------------------------
| Scheduled Reports
|--------------------------------------------------------------------------
*/

router.get(
    "/scheduled",
    protect,
    reportController.getScheduledReports
);

/*
|--------------------------------------------------------------------------
| Create Report
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    protect,
    reportController.createReport
);

/*
|--------------------------------------------------------------------------
| All Reports
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    reportController.getReports
);

/*
|--------------------------------------------------------------------------
| Single Report
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    reportController.getReport
);

/*
|--------------------------------------------------------------------------
| Favourite
|--------------------------------------------------------------------------
*/

router.patch(
    "/favourite/:id",
    protect,
    reportController.toggleFavourite
);

/*
|--------------------------------------------------------------------------
| Share Report
|--------------------------------------------------------------------------
*/

router.post(
    "/share",
    protect,
    reportController.shareReport
);

/*
|--------------------------------------------------------------------------
| Delete Report
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    reportController.deleteReport
);
router.get(
    "/download/:id",
    protect,
    reportController.downloadReport
);
router.post(
    "/import",
    protect,
    reportController.importReport
);
router.get(
    "/run/:id",
    protect,
    reportController.runReport
);
router.post(
    "/schedule",
    protect,
    reportController.createScheduledReport
);
router.patch(
    "/schedule/:id",
    protect,
    reportController.toggleScheduledReport
);
router.delete(
    "/schedule/:id",
    protect,
    reportController.deleteScheduledReport
);

module.exports = router;