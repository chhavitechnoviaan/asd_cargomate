import API from "./axios";

export const getDashboard = async () => {
    return API.get("/market-trends/dashboard");
};

export const getTradeTrend = async () => {
    return API.get("/market-trends/trade-trend");
};

export const getTradeValueByType = async () => {
    return API.get("/market-trends/trade-value-by-type");
};

export const getMarketSummary = async () => {
    return API.get("/market-trends/market-summary");
};

export const getTopCategories = async () => {
    return API.get("/market-trends/top-categories");
};

export const getGrowingCountries = async () => {
  return API.get("/market-trends/growing-countries");
};

export const getDecliningCountries = async () => {
  return API.get("/market-trends/declining-countries");
};

export const getRisingHSCodes = async () => {
  return API.get("/market-trends/rising-hscodes");
};

export const getDecliningHSCodes = async () => {
  return API.get("/market-trends/declining-hscodes");
};

export const getInsights = async () => {
  return API.get("/market-trends/insights");
};

export const getGrowthOpportunities = async () => {
  return API.get("/market-trends/growth-opportunities");
};

export const getFilterOptions = async () => {
  return API.get("/market-trends/filters");
};