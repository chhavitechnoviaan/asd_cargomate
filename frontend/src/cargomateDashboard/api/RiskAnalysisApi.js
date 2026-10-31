import API from "./axios";

export const getRiskDashboard = () => {
  return API.get("/risk-analysis/dashboard");
};

// Risk Map
export const getRiskMap = () => {
  return API.get("/risk-analysis/risk-map");
};

// Risk Distribution
export const getRiskDistribution = () => {
  return API.get("/risk-analysis/risk-distribution");
};

// Top Countries
export const getRiskTopCountries = () => {
  return API.get("/risk-analysis/top-countries");
};

// Risk Categories
export const getRiskCategories = () => {
  return API.get("/risk-analysis/risk-categories");
};

// Recent Alerts
export const getRecentRiskAlerts = () => {
  return API.get("/risk-analysis/recent-alerts");
};

// Risk Trend
export const getRiskTrend = () => {
  return API.get("/risk-analysis/risk-trend");
};

// Top HS Codes
export const getTopRiskHSCodes = () => {
  return API.get("/risk-analysis/top-hscodes");
};

// Shipments At Risk
export const getShipmentsAtRisk = () => {
  return API.get("/risk-analysis/shipments-at-risk");
};

// Filters
export const getRiskFilterOptions = () => {
  return API.get("/risk-analysis/filters");
};