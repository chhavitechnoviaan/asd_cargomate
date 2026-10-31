const express=require("express");
const router=express.Router();

const{

getDashboard,
getBuyers,
getBuyersByCountry,
getTopBuyers,
getPerformance,
getTopProducts,
getRecentActivity,
getInsights,
getFilterOptions

}=require("../controllers/buyerDashboardController");

router.get("/dashboard",getDashboard);

router.get("/buyers",getBuyers);

router.get("/countries",getBuyersByCountry);

router.get("/top-buyers",getTopBuyers);

router.get("/performance",getPerformance);

router.get("/top-products",getTopProducts);

router.get("/recent-activity",getRecentActivity);

router.get("/insights",getInsights);

router.get("/filters",getFilterOptions);

module.exports=router;