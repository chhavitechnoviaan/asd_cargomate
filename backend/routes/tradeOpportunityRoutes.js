const express=require("express");
const router=express.Router();

const{

getDashboard,
getTopCountries,
getDistribution,
getScoreTrend,
getOpportunityTypes,
getTopOpportunities,
getTopHSCodes,
getDemandSupplyInsights,
getRecommendedActions,
getSavedOpportunities,
getFilterOptions

}=require("../controllers/tradeOpportunityController");

router.get("/dashboard",getDashboard);

router.get("/top-countries",getTopCountries);

router.get("/distribution",getDistribution);

router.get("/score-trend",getScoreTrend);

router.get("/opportunity-types",getOpportunityTypes);

router.get("/top-opportunities",getTopOpportunities);

router.get("/top-hscodes",getTopHSCodes);

router.get("/demand-supply",getDemandSupplyInsights);

router.get("/recommended-actions",getRecommendedActions);

router.get("/saved-opportunities",getSavedOpportunities);

router.get("/filters",getFilterOptions);

module.exports=router;