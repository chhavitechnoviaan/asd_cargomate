const express=require("express");

const router=express.Router();

const{

getSuppliers,
getSuppliersByCountry,
getTopSuppliers,
getSupplierPerformance,
getVerificationStatus,
getNewSuppliers,
getSupplierInsights,
getFilterOptions

}=require("../controllers/supplierDashboardController");

router.get("/suppliers",getSuppliers);

router.get("/countries",getSuppliersByCountry);

router.get("/top-suppliers",getTopSuppliers);

router.get("/performance",getSupplierPerformance);

router.get("/verification-status",getVerificationStatus);

router.get("/new-suppliers",getNewSuppliers);

router.get("/insights",getSupplierInsights);

router.get("/filters",getFilterOptions);

module.exports=router;