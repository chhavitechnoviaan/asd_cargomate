const express=require("express");
const router=express.Router();
const { protect } = require("../middleware/authMiddleware");
const{

getDashboard,
getShipments,
getShipmentTracker,
getShipmentStatusOverview,
getShipmentsByMode,
getTopOriginCountries,
getRecentAlerts,
getTopDestinationCountries,
getFilterOptions

}=require("../controllers/shipmentDashboardController");

router.get("/dashboard",protect,getDashboard);

router.get("/shipments",protect,getShipments);

router.get("/tracker/:id",protect,getShipmentTracker);

router.get("/status-overview",protect,getShipmentStatusOverview);

router.get("/shipment-modes",protect,getShipmentsByMode);

router.get("/origin-countries",getTopOriginCountries);

router.get("/recent-alerts",getRecentAlerts);

router.get("/destination-countries",getTopDestinationCountries);

router.get("/filters",protect,getFilterOptions);

module.exports=router;