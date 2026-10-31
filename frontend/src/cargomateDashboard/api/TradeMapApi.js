import API from "./axios";

export const getDashboard = async () => {
    return API.get("/trade-map/dashboard");
};

export const getTradeFlow = async () => {
    return API.get("/trade-map/trade-flow");
};

export const getTopRoutes = async () => {
    return API.get("/trade-map/top-routes");
};

export const getCountryOverview = async () => {
    return API.get("/trade-map/country-overview");
};

export const getTopCountries = async () => {
    return API.get("/trade-map/top-countries");
};

export const getRegionAnalysis = async () => {
    return API.get("/trade-map/region-analysis");
};

export const getSummary = async () => {
    return API.get("/trade-map/summary");
};

export const getFilterOptions = async () => {
    return API.get("/trade-map/filters");
};