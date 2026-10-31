const express=require("express");
const router=express.Router();
const { protect } = require("../middleware/authMiddleware");
const{
getDashboard,
getDocuments,
getDocumentsByType,
getDocumentStatusOverview,
getDocumentInsights,
getExpiringDocuments,
getRecentUploads,
getFilterOptions
}=require("../controllers/documentDashboardController");

router.get("/dashboard",protect,getDashboard);

router.get("/documents",protect,getDocuments);

router.get("/documents-by-type",protect,getDocumentsByType);

router.get("/status-overview",protect,getDocumentStatusOverview);

router.get("/insights",protect,getDocumentInsights);

router.get("/expiring",getExpiringDocuments);

router.get("/recent-uploads",protect,getRecentUploads);

router.get("/filters",protect,getFilterOptions);

module.exports=router;