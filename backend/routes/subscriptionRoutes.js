const express = require("express");
const router = express.Router();

const {

    getSubscriptionDashboard,
    getUsageSummary,
    getInvoices,
    downloadInvoice,
    getBillingHistory,
    getPaymentMethod,
    changePlan,
    updatePaymentMethod,
    cancelSubscription

} = require("../controllers/subscriptionController");

const {

    protect

} = require("../middleware/authMiddleware");

router.get(
    "/dashboard",
    protect,
    getSubscriptionDashboard
);

router.get(
    "/usage",
    protect,
    getUsageSummary
);

router.get(
    "/invoices",
    protect,
    getInvoices
);

router.get(
    "/invoice/:id",
    protect,
    downloadInvoice
);

router.get(
    "/billing-history",
    protect,
    getBillingHistory
);

router.get(
    "/payment-method",
    protect,
    getPaymentMethod
);

router.put(
    "/change-plan",
    protect,
    changePlan
);

router.put(
    "/payment-method",
    protect,
    updatePaymentMethod
);

router.put(
    "/cancel",
    protect,
    cancelSubscription
);

module.exports = router;