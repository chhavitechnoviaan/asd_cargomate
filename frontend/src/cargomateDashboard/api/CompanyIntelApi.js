import API from "./axios";

export const getDashboard = () =>
  API.get("/company-intelligence/dashboard");

export const getCompanyProfile = () =>
  API.get("/company-intelligence/company-profile");

export const getTopHSCodes = () =>
  API.get("/company-intelligence/top-hs-codes");

export const getTopTradingPartners = () =>
  API.get("/company-intelligence/top-trading-partners");

export const getTradeTrend = () =>
  API.get("/company-intelligence/trade-trend");

export const getImportExportChart = () =>
  API.get("/company-intelligence/import-export-chart");

export const getShipmentTrend = () =>
  API.get("/company-intelligence/shipment-trend");

export const getTopProducts = () =>
  API.get("/company-intelligence/top-products");

export const getRecentShipments = () =>
  API.get("/company-intelligence/recent-shipments");

export const getTopCountries = () =>
  API.get("/company-intelligence/top-countries");

export const getFinancialSnapshot = () =>
  API.get("/company-intelligence/financial-snapshot");

export const getFilterOptions = () =>
  API.get("/company-intelligence/filters");

export const getCompanyDetails = (id) =>
  API.get(`/company-intelligence/details/${id}`);