const express=require("express");
const router=express.Router();

const{

getDashboard,
getTradeComparison,
getMarketShare,
getTradeTrend,
getTopCompetitors,
getTopProducts,
getCountryPresence,
getActivitySnapshot,
getFilterOptions,
getCompetitorDetails,
getInsights

}=require("../controllers/competitorTrackingController");

router.get("/dashboard",getDashboard);

router.get("/trade-comparison",getTradeComparison);

router.get("/market-share",getMarketShare);

router.get("/trade-trend",getTradeTrend);

router.get("/top-competitors",getTopCompetitors);

router.get("/top-products",getTopProducts);

router.get("/country-presence",getCountryPresence);

router.get("/activity-snapshot",getActivitySnapshot);

router.get("/filters",getFilterOptions);

router.get("/details/:id",getCompetitorDetails);

router.get("/insights",getInsights);

module.exports=router;