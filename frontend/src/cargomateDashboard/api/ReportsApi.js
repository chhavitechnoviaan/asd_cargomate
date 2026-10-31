import API from "./axios";

export const getDashboard = async () => {
    return API.get("/reports-dashboard/dashboard");
};

export const getOverview = async () => {
    return API.get("/reports-dashboard/overview");
};

export const getRecentReports = async () => {
    return API.get("/reports-dashboard/recent");
};

export const getPopularReports = async () => {
    return API.get("/reports-dashboard/popular");
};

export const getInsights = async () => {
    return API.get("/reports-dashboard/insights");
};

export const generateReport = async (data) => {
    return API.post("/reports-dashboard/generate", data);
};

export const downloadReport = async (id) => {
    return API.get(`/reports-dashboard/download/${id}`);
};

export const exportData = async () => {
    return API.get("/reports-dashboard/export");
};

export const getFilterOptions = async () => {
    return API.get("/reports-dashboard/filter-options");
};
