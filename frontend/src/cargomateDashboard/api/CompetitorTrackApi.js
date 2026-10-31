import API from "./axios";

export const getDashboard = async () => {
  return API.get("/competitor-tracking/dashboard");
};

export const getTradeComparison = async () => {
  return API.get("/competitor-tracking/trade-comparison");
};

export const getMarketShare = async () => {
  return API.get("/competitor-tracking/market-share");
};

export const getTradeTrend = async () => {
  return API.get("/competitor-tracking/trade-trend");
};

export const getTopCompetitors = async () => {
  return API.get("/competitor-tracking/top-competitors");
};

export const getTopProducts = async () => {
  return API.get("/competitor-tracking/top-products");
};

export const getCountryPresence = async () => {
  return API.get("/competitor-tracking/country-presence");
};

export const getActivitySnapshot = async () => {
  return API.get("/competitor-tracking/activity-snapshot");
};

export const getFilterOptions = async () => {
  return API.get("/competitor-tracking/filters");
};

export const getCompetitorDetails = async (id) => {
  return API.get(`/competitor-tracking/details/${id}`);
};

export const getInsights = async () => {
  return API.get("/competitor-tracking/insights");
};