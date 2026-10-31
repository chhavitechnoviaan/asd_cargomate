const express=require("express");
const router=express.Router();

const{

getDashboard,
getRiskMap,
getRiskDistribution,
getTopCountries,
getRiskCategories,
getRecentAlerts,
getRiskTrend,
getTopRiskHSCodes,
getShipmentsAtRisk,
getFilterOptions

}=require("../controllers/riskAnalysisController");

router.get("/dashboard",getDashboard);

router.get("/risk-map",getRiskMap);

router.get("/risk-distribution",getRiskDistribution);

router.get("/top-countries",getTopCountries);

router.get("/risk-categories",getRiskCategories);

router.get("/recent-alerts",getRecentAlerts);

router.get("/risk-trend",getRiskTrend);

router.get("/top-hscodes",getTopRiskHSCodes);

router.get("/shipments-at-risk",getShipmentsAtRisk);

router.get("/filters",getFilterOptions);

module.exports=router;