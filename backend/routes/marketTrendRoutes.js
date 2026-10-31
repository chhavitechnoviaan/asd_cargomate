const express=require("express");
const router=express.Router();

const{

getDashboard,
getTradeTrend,
getTradeValueByType,
getMarketSummary,
getTopCategories,
getGrowingCountries,
getDecliningCountries,
getRisingHSCodes,
getDecliningHSCodes,
getInsights,
getGrowthOpportunities,
getFilterOptions

}=require("../controllers/marketTrendController");

router.get("/dashboard",getDashboard);
router.get("/trade-trend",getTradeTrend);
router.get("/trade-value-by-type",getTradeValueByType);
router.get("/market-summary",getMarketSummary);
router.get("/top-categories",getTopCategories);
router.get("/growing-countries",getGrowingCountries);
router.get("/declining-countries",getDecliningCountries);
router.get("/rising-hscodes",getRisingHSCodes);
router.get("/declining-hscodes",getDecliningHSCodes);
router.get("/insights",getInsights);
router.get("/growth-opportunities",getGrowthOpportunities);
router.get("/filters",getFilterOptions);

module.exports=router;