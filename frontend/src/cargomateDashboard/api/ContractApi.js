import API from "./axios";

export const getDashboard = async () => {
    return API.get("/contracts/dashboard");
};

export const getContracts = async (params) => {
    return API.get("/contracts", { params });
};

export const getStatusSummary = async () => {
    return API.get("/contracts/status-summary");
};

export const getTypeSummary = async () => {
    return API.get("/contracts/type-summary");
};

export const getTopParties = async () => {
    return API.get("/contracts/top-parties");
};

export const getInsights = async () => {
    return API.get("/contracts/insights");
};

export const getValueTrend = async () => {
    return API.get("/contracts/value-trend");
};

export const getExpiringContracts = async () => {
    return API.get("/contracts/expiring");
};

export const getFilterOptions = async () => {
    return API.get("/contracts/filter-options");
};

