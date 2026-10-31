import API from "./axios";

export const getDashboard = async () => {
    return API.get("/buyer-intelligence/dashboard");
};

export const getTopBuyers = async () => {
    return API.get("/buyer-intelligence/top-buyers");
};

export const getGrowthBuyers = async () => {
    return API.get("/buyer-intelligence/growth-buyers");
};

export const getBuyerConcentration = async () => {
    return API.get("/buyer-intelligence/buyer-concentration");
};

export const getTradeTrend = async () => {
    return API.get("/buyer-intelligence/trade-trend");
};

export const getCountries = async () => {
    return API.get("/buyer-intelligence/countries");
};

export const getRecentShipments = async () => {
    return API.get("/buyer-intelligence/recent-shipments");
};

export const getFilterOptions = async () => {
    return API.get("/buyer-intelligence/filters");
};