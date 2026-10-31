import API from "./axios";

export const getDashboard = () => {
    return API.get("/trade-invoices/dashboard");
};

export const getInvoices = (params) => {
    return API.get("/trade-invoices", {params});
};

export const getStatusSummary = () => {
    return API.get("/trade-invoices/status-summary");
};

/*export const getValueTrend = () => {
    return API.get("/trade-invoices/value-trend");
};*/

export const getRecentInvoices = () => {
    return API.get("/trade-invoices/recent");
};

export const getTopParties = () => {
    return API.get("/trade-invoices/top-parties");
};

export const getOverdueInvoices = () => {
    return API.get("/trade-invoices/overdue");
};

export const getInsights = () => {
    return API.get("/trade-invoices/insights");
};

export const getFilterOptions = () => {
    return API.get("/trade-invoices/filter-options");
};