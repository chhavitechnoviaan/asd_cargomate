import API from "./axios";

export const getDashboard = async () => {
    return API.get("/alerts-notifications/dashboard");
};

export const getAlerts = async () => {
    return API.get("/alerts-notifications/alerts");
};

export const getAlertFilters = async () => {
    return API.get("/alerts-notifications/alerts/filter-options");
};

export const resolveAlert = async (id) => {
    return API.patch(`/alerts-notifications/alerts/resolve/${id}`);
};

export const deleteAlert = async (id) => {
    return API.delete(`/alerts-notifications/alerts/${id}`);
};

export const getNotifications = async () => {
    return API.get("/alerts-notifications/notifications");
};

export const getNotificationFilters = async () => {
    return API.get("/alerts-notifications/notifications/filter-options");
};

export const markNotificationsRead = async (id) => {
    return API.patch(`/alerts-notifications/notifications/read/${id}`);
};

export const markAllNotificationsRead =  async () => {
    return API.patch("/alerts-notifications/notifications/read-all");
};

export const deleteNotification = async (id) => {
    return API.delete(`/alerts-notifications/notifications/${id}`);
};