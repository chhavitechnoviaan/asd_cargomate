import API from "./axios";

export const getTradeOpportunityDashboard = () => {
  return API.get("/trade-opportunities/dashboard");
};

export const getTopCountries = () => {
  return API.get("/trade-opportunities/top-countries");
};

export const getDistribution = () => {
  return API.get("/trade-opportunities/distribution");
};

export const getScoreTrend = () => {
  return API.get("/trade-opportunities/score-trend");
};

export const getOpportunityTypes = () => {
  return API.get("/trade-opportunities/opportunity-types");
};

export const getTopOpportunities = () => {
  return API.get("/trade-opportunities/top-opportunities");
};

export const getTopHSCodes = () => {
  return API.get("/trade-opportunities/top-hscodes");
};

export const getDemandSupplyInsights = () => {
  return API.get("/trade-opportunities/demand-supply");
};

export const getRecommendedActions = () => {
  return API.get("/trade-opportunities/recommended-actions");
};

export const getSavedOpportunities = () => {
  return API.get("/trade-opportunities/saved-opportunities");
};

export const getTradeOpportunityFilters = () => {
  return API.get("/trade-opportunities/filters");
};