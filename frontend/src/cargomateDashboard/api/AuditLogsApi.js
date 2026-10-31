import API from "./axios";

export const getAuditDashboard = async () => {
    return API.get("/audit-logs/dashboard");
};

export const activitiesByModule = async () => {
    return API.get("/audit-logs/analytics/modules");
};

export const activityTimeline = async () => {
    return API.get("/audit-logs/analytics/timeline");
};

export const getFilterOptions = async () => {
    return API.get("/audit-logs/filter-options");
};

export const getAuditLogs = async (params) => {
    return API.get("/audit-logs/", {params});
};

export const getAuditLogDetails = async (id) => {
    return API.get(`/audit-logs/${id}`);
};

export const deleteAuditLog = async (id) => {
    return API.delete(`/audit-logs/${id}`);
};

export const clearAuditLogs = async () => {
    return API.delete("/audit-logs/clear/all");
};