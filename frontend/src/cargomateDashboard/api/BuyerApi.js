import API from "./axios";

//BuyerDashboard API functions
export const getDashboard = () => {
    return API.get("/buyer-dashboard/dashboard");
};

export const getBuyersList = () => {
    return API.get("/buyer-dashboard/buyers");
};

export const getBuyersByCountry = () => {
    return API.get("/buyer-dashboard/countries");
};

export const getTopBuyers = () => {
    return API.get("/buyer-dashboard/top-buyers");
};

export const getPerformance = () => {
    return API.get("/buyer-dashboard/performance");
};

export const getTopProducts = () => {
    return API.get("/buyer-dashboard/top-products");
};

export const getRecentActivity = () => {
    return API.get("/buyer-dashboard/recent-activity");
};

export const getInsights = () => {
    return API.get("/buyer-dashboard/insights");
};

export const getFilterOptions = () => {
    return API.get("/buyer-dashboard/filters");
};

//Buyer API functions
export const getBuyers = () => {
    return API.get("/buyers");
};

export const createBuyer = (buyerData) => {
    return API.post("/buyers", buyerData);
};