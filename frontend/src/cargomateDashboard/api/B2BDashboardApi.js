import API from "./axios";

export const getDashboardMetrics = () => {
  return API.get("/B2B-Dashboard/dashboard-metrics");
};

export const getOperationalInsights = () => {
  return API.get("/B2B-Dashboard/operational-insights");
};

export const getGlobalTradeOverview = () => {
  return API.get("/B2B-Dashboard/global-trade-overview");
};

export const getTradeValueTrend = () => {
  return API.get("/B2B-Dashboard/trade-value-trend");
};

export const getTopTradingPartners = () => {
  return API.get("/B2B-Dashboard/top-trading-partners");
};

export const getTopImportedProducts = () => {
  return API.get("/B2B-Dashboard/top-imported-products");
};

export const getTopExportDestinations = () => {
  return API.get("/B2B-Dashboard/top-export-destinations");
};

export const getRecentShipments = () => {
  return API.get("/B2B-Dashboard/recent-shipments");
};