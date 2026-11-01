const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
if (fs.existsSync(path.join(__dirname, ".env"))) {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
} else if (fs.existsSync(path.join(__dirname, "env"))) {
  require("dotenv").config({ path: path.join(__dirname, "env") });
} else {
  require("dotenv").config();
}

const app = express();

console.log("1");
const documentRoutes = require("./routes/documentRoutes");

console.log("2");
const auditLogRoutes = require("./routes/auditLogRoutes");

console.log("3");
const analyticsRoutes = require("./routes/analyticsRoutes");

console.log("4");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const helpSupportRoutes=require("./routes/helpSupportRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");
const B2BDashboardRoutes= require("./routes/B2BDashboardRoutes");
const b2bImportRoutes = require("./routes/b2bImportRoutes");
const b2bExportRoutes = require("./routes/b2bExportRoutes");
const shipmentDatabaseRoutes = require("./routes/shipmentDatabaseRoutes");
const hsCodeIntelligenceRoutes = require("./routes/hsCodeIntelligenceRoutes");
const supplierDiscoveryRoutes = require("./routes/supplierDiscoveryRoutes");
const buyerIntelligenceRoutes = require("./routes/buyerIntelligenceRoutes");
const tradeMapRoutes = require("./routes/tradeMapRoutes");
const marketTrendRoutes=require("./routes/marketTrendRoutes");  
const competitorTrackingRoutes=require("./routes/competitorTrackingRoutes");
const companyIntelligenceRoutes = require("./routes/companyIntelligenceRoutes");
const tradeOpportunityRoutes=require("./routes/tradeOpportunityRoutes");
const riskAnalysisRoutes=require("./routes/riskAnalysisRoutes");
const shipmentDashboardRoutes=require("./routes/shipmentDashboardRoutes");
const documentDashboardRoutes=require("./routes/documentDashboardRoutes");
const supplierDashboardRoutes=require("./routes/supplierDashboardRoutes");
const buyerDashboardRoutes=require("./routes/buyerDashboardRoutes");
const contractRoutes = require("./routes/contractRoutes");
const tradeInvoiceRoutes = require("./routes/tradeInvoiceRoutes");
const reportsDashboardRoutes = require("./routes/reportsDashboardRoutes");
const alertsNotificationRoutes = require("./routes/alertsNotificationRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminSettingsRoutes = require("./routes/adminSettingsRoutes");
const usersRolesRoutes = require("./routes/usersRolesRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
app.use(cors());
app.post("/api/ai-subscription/webhook",require("express").raw({type:"application/json",limit:"512kb"}),require("./controllers/aiSubscriptionController").webhook);
app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.use("/api/test", require("./routes/testroutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/notice", require("./routes/noticeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/ai-subscription",require("./routes/aiSubscriptionRoutes"));
app.use("/api/master", require("./routes/itemsRoutes"));
app.use("/api/hs", require("./routes/HsRoutes"));
app.use("/api/country-rules", require("./routes/countryRuleRoutes"));
app.use("/api/dgft", require("./routes/dgftRoutes"));
app.use("/api/shipments", require("./routes/shipmentRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/trade", require("./routes/tradeRoutes"));
app.use("/api/buyers", require("./routes/buyerRoutes"));
app.use("/api/trade-intel", require("./routes/tradeIntelRoutes"));
app.use("/api/integrations", require("./routes/integrationRoutes"));
app.use("/api/ads", require("./routes/adRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/modules", require("./routes/moduleRoutes"));
app.use("/api/country", require("./routes/countryRoutes"));
app.use("/api/documents",documentRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/help-support",helpSupportRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/B2B-Dashboard", B2BDashboardRoutes);
app.use("/api/b2b/import", b2bImportRoutes);
app.use("/api/b2b/export", b2bExportRoutes);
app.use("/api/shipment-database", shipmentDatabaseRoutes);
app.use("/api/hscode-intelligence", hsCodeIntelligenceRoutes);
app.use("/api/supplier-discovery", supplierDiscoveryRoutes);
app.use("/api/buyer-intelligence", buyerIntelligenceRoutes);
app.use("/api/trade-map", tradeMapRoutes);
app.use("/api/market-trends",marketTrendRoutes);
app.use("/api/competitor-tracking",competitorTrackingRoutes);
app.use("/api/company-intelligence", companyIntelligenceRoutes);
app.use("/api/trade-opportunities",tradeOpportunityRoutes);
app.use("/api/risk-analysis",riskAnalysisRoutes);
app.use("/api/shipment-dashboard",shipmentDashboardRoutes);
app.use("/api/document-dashboard",documentDashboardRoutes);
app.use("/api/supplier-dashboard",supplierDashboardRoutes);
app.use("/api/buyer-dashboard",buyerDashboardRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/trade-invoices", tradeInvoiceRoutes);
app.use("/api/reports-dashboard", reportsDashboardRoutes);
app.use("/api/alerts-notifications", alertsNotificationRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/users-roles", usersRolesRoutes);
app.use("/api/admin-settings", adminSettingsRoutes);
app.use("/api/quotations", quotationRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// In-process reminder check for local installations. Production: prefer a durable daily worker.
const runExpiryReminders=()=>require("./controllers/aiSubscriptionController").expiryAlerts().catch(e=>console.error("Expiry reminder error",e.message));
// Run `node workers/subscriptionReminders.js` from an external daily scheduler.
